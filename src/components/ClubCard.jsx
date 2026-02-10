import React from 'react';

const categoryColors = {
  Tech: 'bg-blue-100 text-blue-800',
  Sports: 'bg-green-100 text-green-800',
  Arts: 'bg-purple-100 text-purple-800',
  Academic: 'bg-yellow-100 text-yellow-800',
  Community: 'bg-pink-100 text-pink-800',
};

const ClubCard = ({ club }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800">{club.name}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[club.category]}`}>
          {club.category}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 flex-grow">
        {club.description}
      </p>
      
      <div className="mt-auto">
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{club.meetingTime}</span>
        </div>
      </div>
    </div>
  );
};

export default ClubCard;
