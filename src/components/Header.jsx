import React from 'react';

const Header = () => {
  return (
    <header className="text-center mb-12 pt-4">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-indigo-300 mb-6 tracking-wide uppercase">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        Alliance Academy for Innovation
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
        <span className="bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
          Club Hub
        </span>
      </h1>
      <p className="text-lg md:text-xl text-neutral-400 max-w-xl mx-auto leading-relaxed">
        Discover clubs, find your crew, and never miss an event
      </p>
    </header>
  );
};

export default Header;
