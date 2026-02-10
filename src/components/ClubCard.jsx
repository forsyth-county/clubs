import React from 'react';

const categoryColors = {
  Tech: 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20',
  Sports: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20',
  Arts: 'bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20',
  Academic: 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20',
  Community: 'bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20',
};

const ClubCard = ({ club }) => {
  return (
    <div className="glass glass-hover rounded-2xl p-5 flex flex-col h-full transition-all duration-300 group">
      <div className="flex justify-between items-start mb-3 gap-2">
        <h3 className="text-base font-semibold text-white group-hover:text-indigo-200 transition-colors leading-snug">
          {club.name}
        </h3>
        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap ${categoryColors[club.category]}`}>
          {club.category}
        </span>
      </div>
      
      <p className="text-neutral-400 text-sm mb-4 flex-grow leading-relaxed">
        {club.description}
      </p>
      
      <div className="mt-auto space-y-1.5 pt-3 border-t border-white/[0.06]">
        <div className="flex items-center text-xs text-neutral-500">
          <svg className="w-3.5 h-3.5 mr-2 flex-shrink-0 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{club.meetingTime}</span>
        </div>
        
        {club.sponsor && (
          <div className="flex items-center text-xs text-neutral-500">
            <svg className="w-3.5 h-3.5 mr-2 flex-shrink-0 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span>{club.sponsor}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubCard;
