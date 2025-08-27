import React from 'react';
import { BookOpen, Calendar, Users, Star, ExternalLink } from 'lucide-react';
import { getCoverUrl, getBookUrl } from '../services/bookApi';

const BookCard = ({ book, onClick }) => {
  const coverUrl = book.cover_i ? getCoverUrl(book.cover_i, 'M') : null;
  const bookUrl = getBookUrl(book.key);

  const handleCardClick = () => {
    onClick(book);
  };

  const handleExternalClick = (e) => {
    e.stopPropagation();
    window.open(bookUrl, '_blank');
  };

  return (
    <div 
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gray-200 hover:border-blue-300 transform hover:-translate-y-2 hover:scale-[1.02]"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-100 to-gray-200">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={book.title}
            className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              const target = e.target;
              target.style.display = 'none';
              target.parentElement.innerHTML = `
                <div class="w-full h-52 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                  <div class="text-center text-gray-500">
                    <svg class="w-16 h-16 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                    </svg>
                    <p class="text-sm font-medium">No Cover</p>
                  </div>
                </div>
              `;
            }}
          />
        ) : (
          <div className="w-full h-52 flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
            <div className="text-center text-gray-600">
              <BookOpen className="w-16 h-16 mx-auto mb-3" />
              <p className="text-sm font-semibold">No Cover Available</p>
            </div>
          </div>
        )}
        
        <button
          onClick={handleExternalClick}
          className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
          title="View on Open Library"
        >
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
          {book.title}
        </h3>
        
        {book.author_name && book.author_name.length > 0 && (
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <Users className="w-4 h-4 mr-2 text-purple-500" />
            <span className="line-clamp-1">
              {book.author_name.slice(0, 2).join(', ')}
              {book.author_name.length > 2 && ` +${book.author_name.length - 2} more`}
            </span>
          </div>
        )}

        {book.first_publish_year && (
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
            <span>Published {book.first_publish_year}</span>
          </div>
        )}

        {book.ratings_average && book.ratings_count && (
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <Star className="w-4 h-4 mr-2 text-yellow-500 fill-current" />
            <span>
              {book.ratings_average.toFixed(1)} ({book.ratings_count.toLocaleString()} ratings)
            </span>
          </div>
        )}

        {book.subject && book.subject.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {book.subject.slice(0, 3).map((subject, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs rounded-full font-medium"
              >
                {subject}
              </span>
            ))}
            {book.subject.length > 3 && (
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                +{book.subject.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;