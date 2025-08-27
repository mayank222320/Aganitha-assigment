import React from 'react';
import { ChevronDown } from 'lucide-react';

const LoadMoreButton = ({ onLoadMore, loading, hasMore }) => {
  if (!hasMore) {
    return null;
  }

  return (
    <div className="flex justify-center mt-12">
      <button
        onClick={onLoadMore}
        disabled={loading}
        className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-2xl transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:transform-none"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            <span>Loading...</span>
          </>
        ) : (
          <>
            <span>Load More Books</span>
            <ChevronDown className="w-5 h-5" />
          </>
        )}
      </button>
    </div>
  );
};

export default LoadMoreButton;