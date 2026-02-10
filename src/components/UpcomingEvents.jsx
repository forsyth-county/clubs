import React from 'react';
import { useCalendarEvents } from '../hooks/useCalendarEvents';

const MAX_DISPLAYED_EVENTS = 6;

const UpcomingEvents = () => {
  const { events, loading, error, calendarUrl, icsUrl } = useCalendarEvents();

  return (
    <section className="mb-12 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <span className="text-2xl">📅</span> Upcoming Events
        </h2>
        <div className="flex gap-3">
          <a
            href={icsUrl}
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Subscribe
          </a>
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            View full calendar →
          </a>
        </div>
      </div>

      {loading && (
        <div className="glass rounded-2xl p-8 text-center">
          <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          <p className="text-neutral-500 mt-3 text-sm">Loading live events...</p>
        </div>
      )}

      {error && (
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-neutral-400 text-sm mb-2">
            Unable to load live calendar data.
          </p>
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 underline text-sm"
          >
            View the full Alliance Academy calendar →
          </a>
        </div>
      )}

      {!loading && !error && events.length === 0 && (
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-neutral-500 text-sm">No upcoming events found.</p>
        </div>
      )}

      {!loading && !error && events.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {events.slice(0, MAX_DISPLAYED_EVENTS).map((event, idx) => (
            <div
              key={idx}
              className="glass glass-hover rounded-xl p-4 transition-all duration-200"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <h3 className="text-white font-medium text-sm mb-2 leading-snug">
                {event.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                {event.date && (
                  <span className="text-neutral-400">
                    {new Date(event.date + 'T12:00:00').toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                )}
                {event.start && (
                  <span className="text-indigo-400 font-medium">
                    {event.start}
                    {event.end ? ` – ${event.end}` : ''}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UpcomingEvents;
