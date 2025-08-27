import React from 'react';
import BookCard from './BookCard';

const BookGrid = ({ books, onBookClick, loading }) => {
  if (loading && books.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-52 rounded-t-2xl"></div>
            <div className="p-5">
              <div className="h-5 bg-gray-200 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-1/2 mb-3"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {books.map((book) => (
        <BookCard key={book.key} book={book} onClick={onBookClick} />
      ))}
    </div>
  );
};

export default BookGrid;