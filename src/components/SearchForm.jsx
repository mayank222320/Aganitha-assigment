import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const SearchForm = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch({
        query: query.trim(),
        searchType,
        limit: 20,
        offset: 0
      });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books..."
            className="block w-full pl-12 pr-32 py-4 border-2 border-gray-200 rounded-2xl leading-5 bg-white/80 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="absolute inset-y-0 right-20 flex items-center pr-3 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Filter className="h-6 w-6" />
          </button>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none">
              {loading ? 'Searching...' : 'Search'}
            </span>
          </button>
        </div>

        {showFilters && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-wrap gap-4 items-center">
              <label className="text-sm font-semibold text-gray-700 mr-2">Search by:</label>
              {[
                { value: 'title', label: 'Title' },
                { value: 'author', label: 'Author' },
                { value: 'isbn', label: 'ISBN' },
                { value: 'subject', label: 'Subject' }
              ].map(option => (
                <label key={option.value} className="flex items-center space-x-2 cursor-pointer bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl transition-colors">
                  <input
                    type="radio"
                    name="searchType"
                    value={option.value}
                    checked={searchType === option.value}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchForm;