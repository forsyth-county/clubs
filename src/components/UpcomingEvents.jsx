import React from 'react';
import { useCalendarEvents } from '../hooks/useCalendarEvents';

const UpcomingEvents = () => {
  const { events, loading, error, calendarUrl } = useCalendarEvents();

  return (
    <div className="mb-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        📅 Upcoming Events
      </h2>

      {loading && (
        <div className="text-center py-6">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          <p className="text-neutral-400 mt-2">Loading calendar events...</p>
        </div>
      )}

      {error && (
        <div className="bg-neutral-900/80 border border-neutral-700 rounded-lg p-4 text-center">
          <p className="text-neutral-400 mb-2">
            Unable to load live calendar data.
          </p>
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 underline"
          >
            View the full Alliance Academy calendar →
          </a>
        </div>
      )}

      {!loading && !error && events.length === 0 && (
        <p className="text-neutral-400 text-center">No upcoming events found.</p>
      )}

      {!loading && !error && events.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {events.slice(0, 8).map((event, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/80 border border-neutral-700 rounded-lg p-4 hover:border-indigo-500/50 transition-colors"
            >
              <h3 className="text-white font-semibold text-sm mb-1">
                {event.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                {event.date && (
                  <span>
                    {new Date(event.date + 'T12:00:00').toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                )}
                {event.start && (
                  <span className="text-indigo-400">
                    {event.start}
                    {event.end ? ` - ${event.end}` : ''}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-4">
        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-indigo-400 hover:text-indigo-300 underline"
        >
          View full calendar at Alliance Academy →
        </a>
      </div>
    </div>
  );
};

export default UpcomingEvents;
