import React from 'react';

const categoryEmojis = {
  All: '✨',
  Tech: '💻',
  Sports: '⚡',
  Arts: '🎨',
  Academic: '📚',
  Community: '🤝',
};

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-10 flex flex-wrap justify-center gap-2">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === category
              ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/50 shadow-lg shadow-indigo-500/10'
              : 'glass text-neutral-400 hover:text-white hover:bg-white/[0.06]'
          }`}
        >
          <span className="mr-1.5">{categoryEmojis[category]}</span>
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
