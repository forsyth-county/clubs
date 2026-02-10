import React, { useState } from 'react';
import ClubCard from './components/ClubCard';
import GridBackground from './components/GridBackground';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import UpcomingEvents from './components/UpcomingEvents';
import { clubsData, categories } from './data/clubsData';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredClubs = clubsData.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <GridBackground>
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <Header />

        {/* Upcoming Events from Alliance Academy Calendar */}
        <UpcomingEvents />

        {/* Search & Filter Section */}
        <div className="glass rounded-2xl p-6 mb-8">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <p className="text-center text-neutral-500 text-sm">
            {filteredClubs.length} {filteredClubs.length === 1 ? 'club' : 'clubs'} found
          </p>
        </div>

        {/* Clubs Grid */}
        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredClubs.map((club, idx) => (
              <div key={club.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 30}ms` }}>
                <ClubCard club={club} />
              </div>
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl text-center py-16">
            <p className="text-lg text-neutral-400 mb-1">No clubs found</p>
            <p className="text-neutral-500 text-sm">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 pb-8">
          <p className="text-neutral-600 text-xs">
            Alliance Academy for Innovation — Club Hub
          </p>
        </footer>
      </div>
    </GridBackground>
  );
}

export default App;
