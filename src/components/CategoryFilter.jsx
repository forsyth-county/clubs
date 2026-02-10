import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-3">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
            selectedCategory === category
              ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
              : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 shadow-md border border-neutral-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
