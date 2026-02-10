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
      <div className="container mx-auto px-4 py-8">
        <Header />
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Upcoming Events from Alliance Academy Calendar */}
        <UpcomingEvents />

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-neutral-400">
            Showing {filteredClubs.length} {filteredClubs.length === 1 ? 'club' : 'clubs'}
          </p>
        </div>

        {/* Clubs Grid */}
        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map(club => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-neutral-400">No clubs found matching your criteria.</p>
            <p className="text-neutral-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </GridBackground>
  );
}

export default App;
