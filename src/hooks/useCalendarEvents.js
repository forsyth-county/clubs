import { useState, useEffect } from 'react';

const CALENDAR_URL = 'https://alliance.forsyth.k12.ga.us/alliance-academy-for-innovation-calendar';

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

  // Deduplicate by title + date
  const seen = new Set();
  return events.filter(e => {
    const key = `${e.title}_${e.date}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function useCalendarEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchCalendar() {
      try {
        const response = await fetch(CALENDAR_URL, { mode: 'cors' });
        if (!response.ok) throw new Error('Failed to fetch calendar');
        const html = await response.text();
        if (!cancelled) {
          const parsed = parseEventsFromHTML(html);
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

  return { events, loading, error, calendarUrl: CALENDAR_URL };
}
