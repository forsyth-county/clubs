import React from 'react';

const categoryColors = {
  Tech: 'bg-blue-900/50 text-blue-300 border border-blue-700',
  Sports: 'bg-green-900/50 text-green-300 border border-green-700',
  Arts: 'bg-purple-900/50 text-purple-300 border border-purple-700',
  Academic: 'bg-yellow-900/50 text-yellow-300 border border-yellow-700',
  Community: 'bg-pink-900/50 text-pink-300 border border-pink-700',
};

const ClubCard = ({ club }) => {
  return (
    <div className="bg-neutral-900/80 border border-neutral-700 rounded-lg shadow-md hover:shadow-xl hover:border-indigo-500/50 transition-all duration-300 p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-white">{club.name}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[club.category]}`}>
          {club.category}
        </span>
      </div>
      
      <p className="text-neutral-400 mb-4 flex-grow">
        {club.description}
      </p>
      
      <div className="mt-auto space-y-2">
        <div className="flex items-center text-sm text-neutral-500">
          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{club.meetingTime}</span>
        </div>
        
        {club.sponsor && (
          <div className="flex items-center text-sm text-neutral-500">
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span>Sponsor: {club.sponsor}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubCard;
