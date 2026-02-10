import { useState, useEffect } from 'react';

const CALENDAR_URL = 'https://alliance.forsyth.k12.ga.us/alliance-academy-for-innovation-calendar';
const ICS_URL = 'https://alliance.forsyth.k12.ga.us/fs/calendar-manager/events.ics?calendar_ids=39';

function buildApiUrl() {
  const now = new Date();
  const calDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
  const timestamp = Date.now();
  const params = `?cal_date=${calDate}&is_draft=false&is_load_more=true&page_id=31931&parent_id=249645&_=${timestamp}`;

  if (import.meta.env.DEV) {
    return `/api/calendar${params}`;
  }
  return `https://alliance.forsyth.k12.ga.us/fs/elements/249645${params}`;
}

function buildIcsUrl() {
  if (import.meta.env.DEV) {
    return '/api/calendar-ics?calendar_ids=39';
  }
  return ICS_URL;
}

function parseEventsFromHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const events = [];

  const eventElements = doc.querySelectorAll('.fsCalendarDayViewEvent.fsCalendarEvent');
  eventElements.forEach(el => {
    const titleLink = el.querySelector('.fsCalendarTitle');
    const startTime = el.querySelector('.fsStartTime');
    const endTime = el.querySelector('.fsEndTime');

    if (!titleLink) return;

    const title = titleLink.getAttribute('title') || titleLink.textContent.trim();
    const occurId = titleLink.getAttribute('data-occur-id') || '';

    let date = '';
    const dateMatch = occurId.match(/(\d{4}-\d{2}-\d{2})T/);
    if (dateMatch) {
      date = dateMatch[1];
    }

    let start = '';
    let end = '';
    if (startTime) {
      start = startTime.textContent.trim().replace(/\s+/g, ' ');
    }
    if (endTime) {
      end = endTime.textContent.trim().replace(/\s+/g, ' ');
    }

    events.push({ title, date, start, end });
  });

  return dedupAndFilter(events);
}

function parseEventsFromICS(icsText) {
  const events = [];
  const blocks = icsText.split('BEGIN:VEVENT');

  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i].split('END:VEVENT')[0];

    const summaryMatch = block.match(/SUMMARY:(.*)/);
    if (!summaryMatch) continue;
    const title = summaryMatch[1].trim();

    let date = '';
    let start = '';
    let end = '';

    const dtStartTz = block.match(/DTSTART;TZID=[^:]+:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/);
    const dtStartDate = block.match(/DTSTART;VALUE=DATE:(\d{4})(\d{2})(\d{2})/);
    const dtEndTz = block.match(/DTEND;TZID=[^:]+:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/);

    if (dtStartTz) {
      date = `${dtStartTz[1]}-${dtStartTz[2]}-${dtStartTz[3]}`;
      const h = parseInt(dtStartTz[4], 10);
      const m = dtStartTz[5];
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
      start = `${h12}:${m} ${ampm}`;
    } else if (dtStartDate) {
      date = `${dtStartDate[1]}-${dtStartDate[2]}-${dtStartDate[3]}`;
    }

    if (dtEndTz) {
      const h = parseInt(dtEndTz[4], 10);
      const m = dtEndTz[5];
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
      end = `${h12}:${m} ${ampm}`;
    }

    events.push({ title, date, start, end });
  }

  return dedupAndFilter(events);
}

function dedupAndFilter(events) {
  const seen = new Set();
  const unique = events.filter(e => {
    const key = `${e.title}_${e.date}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  unique.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.start.localeCompare(b.start);
  });

  const today = new Date().toISOString().slice(0, 10);
  return unique.filter(e => !e.date || e.date >= today);
}

export function useCalendarEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchCalendar() {
      // 1. Try pre-built static JSON (works on GitHub Pages)
      try {
        const base = import.meta.env.BASE_URL || '/';
        const res = await fetch(`${base}calendar-events.json`);
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && data.events && data.events.length > 0) {
            // Re-filter in case the static file is stale
            const today = new Date().toISOString().slice(0, 10);
            const fresh = data.events.filter(e => !e.date || e.date >= today);
            if (fresh.length > 0) {
              setEvents(fresh);
              setLoading(false);
              return;
            }
          }
        }
      } catch (_) {
        // Static file not available, try live APIs
      }

      // 2. Try live HTML API (works in dev via proxy)
      try {
        const apiUrl = buildApiUrl();
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('HTML API failed');
        const html = await response.text();
        if (!cancelled) {
          const parsed = parseEventsFromHTML(html);
          if (parsed.length > 0) {
            setEvents(parsed);
            setLoading(false);
            return;
          }
        }
      } catch (_) {
        // Fall through to ICS
      }

      // 3. Fallback to ICS feed
      try {
        const icsUrl = buildIcsUrl();
        const response = await fetch(icsUrl);
        if (!response.ok) throw new Error('ICS feed failed');
        const icsText = await response.text();
        if (!cancelled) {
          const parsed = parseEventsFromICS(icsText);
          setEvents(parsed);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchCalendar();
    return () => { cancelled = true; };
  }, []);

  return { events, loading, error, calendarUrl: CALENDAR_URL, icsUrl: ICS_URL };
}
