#!/usr/bin/env node

/**
 * Pre-build script: fetches live calendar events from Alliance Academy
 * and writes them to public/calendar-events.json so the React app can
 * load them without CORS issues on GitHub Pages.
 *
 * Data sources (tried in order):
 *  1. Finalsite HTML calendar widget API
 *  2. ICS calendar feed
 */

import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, '..', 'public', 'calendar-events.json');

function buildApiUrl() {
  const now = new Date();
  const calDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
  const ts = Date.now();
  return `https://alliance.forsyth.k12.ga.us/fs/elements/249645?cal_date=${calDate}&is_draft=false&is_load_more=true&page_id=31931&parent_id=249645&_=${ts}`;
}

const ICS_URL = 'https://alliance.forsyth.k12.ga.us/fs/calendar-manager/events.ics?calendar_ids=39';

// ── HTML parser (regex-based for Node, no DOMParser) ──────────────────
function parseEventsFromHTML(html) {
  const events = [];
  // Match each timed event block
  const titleRegex = /class="fsCalendarTitle fsCalendarEventLink" title="([^"]+)" data-occur-id="([^"]+)"/g;
  let m;
  while ((m = titleRegex.exec(html)) !== null) {
    const title = m[1].replace(/&amp;/g, '&');
    const occurId = m[2];
    const dateMatch = occurId.match(/(\d{4}-\d{2}-\d{2})T/);
    const date = dateMatch ? dateMatch[1] : '';

    // Extract times from nearby datetime attributes
    const slice = html.slice(Math.max(0, m.index - 200), m.index + 800);
    let start = '', end = '';
    const startDt = slice.match(/class="fsStartTime"[^>]*>.*?<span class="fsHour">\s*(\d+)<\/span>:<span class="fsMinute">(\d+)<\/span>\s*<span class="fsMeridian">(\w+)<\/span>/s);
    const endDt = slice.match(/class="fsEndTime"[^>]*>.*?<span class="fsHour">\s*(\d+)<\/span>:<span class="fsMinute">(\d+)<\/span>\s*<span class="fsMeridian">(\w+)<\/span>/s);
    if (startDt) start = `${startDt[1].trim()}:${startDt[2].padStart(2, '0')} ${startDt[3]}`;
    if (endDt) end = `${endDt[1].trim()}:${endDt[2].padStart(2, '0')} ${endDt[3]}`;

    events.push({ title, date, start, end });
  }
  return dedup(events);
}

// ── ICS parser ────────────────────────────────────────────────────────
function parseEventsFromICS(icsText) {
  const events = [];
  const blocks = icsText.split('BEGIN:VEVENT');
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i].split('END:VEVENT')[0];
    const summaryMatch = block.match(/SUMMARY:(.*)/);
    if (!summaryMatch) continue;
    const title = summaryMatch[1].trim().replace(/\\,/g, ',');

    let date = '', start = '', end = '';
    const dtsTz = block.match(/DTSTART;TZID=[^:]+:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/);
    const dtsDate = block.match(/DTSTART;VALUE=DATE:(\d{4})(\d{2})(\d{2})/);
    const dteTz = block.match(/DTEND;TZID=[^:]+:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/);

    if (dtsTz) {
      date = `${dtsTz[1]}-${dtsTz[2]}-${dtsTz[3]}`;
      start = fmt12(dtsTz[4], dtsTz[5]);
    } else if (dtsDate) {
      date = `${dtsDate[1]}-${dtsDate[2]}-${dtsDate[3]}`;
    }
    if (dteTz) end = fmt12(dteTz[4], dteTz[5]);

    events.push({ title, date, start, end });
  }
  return dedup(events);
}

function fmt12(h, m) {
  const hr = parseInt(h, 10);
  const ampm = hr >= 12 ? 'PM' : 'AM';
  const h12 = hr === 0 ? 12 : hr > 12 ? hr - 12 : hr;
  return `${h12}:${m} ${ampm}`;
}

function dedup(events) {
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
  return unique.filter(e => e.date >= today);
}

// ── Main ──────────────────────────────────────────────────────────────
async function main() {
  let events = [];

  // Try HTML API
  try {
    console.log('Fetching from Finalsite HTML API...');
    const res = await fetch(buildApiUrl());
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    events = parseEventsFromHTML(html);
    console.log(`  ✓ Parsed ${events.length} upcoming events from HTML API`);
  } catch (err) {
    console.log(`  ✗ HTML API failed: ${err.message}`);
  }

  // Fallback to ICS if HTML had no results
  if (events.length === 0) {
    try {
      console.log('Fetching from ICS feed...');
      const res = await fetch(ICS_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const ics = await res.text();
      events = parseEventsFromICS(ics);
      console.log(`  ✓ Parsed ${events.length} upcoming events from ICS feed`);
    } catch (err) {
      console.log(`  ✗ ICS feed failed: ${err.message}`);
    }
  }

  const output = {
    fetchedAt: new Date().toISOString(),
    events,
  };

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(output, null, 2));
  console.log(`\nWrote ${events.length} events to public/calendar-events.json`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  // Write empty file so the build doesn't break
  const output = { fetchedAt: new Date().toISOString(), events: [] };
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(output, null, 2));
  console.log('Wrote empty calendar-events.json (fetch failed)');
});
