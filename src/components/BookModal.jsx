import React from 'react';
import { X, Calendar, Users, BookOpen, Globe, Star, Hash, Building } from 'lucide-react';
import { getCoverUrl, getBookUrl } from '../services/bookApi';

const BookModal = ({ book, isOpen, onClose }) => {
  if (!isOpen) return null;

  const coverUrl = book.cover_i ? getCoverUrl(book.cover_i, 'L') : null;
  const bookUrl = getBookUrl(book.key);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 shadow-2xl border border-gray-200">
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-800 flex-1 mr-4">Book Details</h2>
          <button
            onClick={onClose}
            className="p-3 hover:bg-gray-100 rounded-full transition-colors group"
          >
            <X className="w-6 h-6 group-hover:text-red-500 transition-colors" />
          </button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Book Cover */}
            <div className="md:col-span-1">
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt={book.title}
                  className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl"
                  onError={(e) => {
                    const target = e.target;
                    target.style.display = 'none';
                    target.parentElement.innerHTML = `
                      <div class="w-full h-96 flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 rounded-2xl shadow-2xl">
                        <div class="text-center text-gray-600">
                          <svg class="w-20 h-20 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                          </svg>
                          <p class="font-bold text-lg">No Cover Available</p>
                        </div>
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="w-full h-96 flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 rounded-2xl shadow-2xl">
                  <div className="text-center text-gray-600">
                    <BookOpen className="w-20 h-20 mx-auto mb-6" />
                    <p className="font-bold text-lg">No Cover Available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Book Information */}
            <div className="md:col-span-2 space-y-6">
              <h1 className="text-3xl font-bold text-gray-800 leading-tight">{book.title}</h1>

              {book.author_name && book.author_name.length > 0 && (
                <div className="flex items-start space-x-3 bg-purple-50 p-4 rounded-xl">
                  <Users className="w-6 h-6 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">Authors</p>
                    <p className="text-gray-700">{book.author_name.join(', ')}</p>
                  </div>
                </div>
              )}

              {book.first_publish_year && (
                <div className="flex items-center space-x-3 bg-indigo-50 p-4 rounded-xl">
                  <Calendar className="w-6 h-6 text-indigo-500" />
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">First Published</p>
                    <p className="text-gray-700">{book.first_publish_year}</p>
                  </div>
                </div>
              )}

              {book.number_of_pages_median && (
                <div className="flex items-center space-x-3 bg-emerald-50 p-4 rounded-xl">
                  <BookOpen className="w-6 h-6 text-emerald-500" />
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">Pages</p>
                    <p className="text-gray-700">{book.number_of_pages_median} pages</p>
                  </div>
                </div>
              )}

              {book.ratings_average && book.ratings_count && (
                <div className="flex items-center space-x-3 bg-yellow-50 p-4 rounded-xl">
                  <Star className="w-6 h-6 text-yellow-500 fill-current" />
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">Rating</p>
                    <p className="text-gray-700">
                      {book.ratings_average.toFixed(1)} out of 5 ({book.ratings_count.toLocaleString()} ratings)
                    </p>
                  </div>
                </div>
              )}

              {book.language && book.language.length > 0 && (
                <div className="flex items-start space-x-3 bg-blue-50 p-4 rounded-xl">
                  <Globe className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">Languages</p>
                    <p className="text-gray-700">{book.language.join(', ')}</p>
                  </div>
                </div>
              )}

              {book.publisher && book.publisher.length > 0 && (
                <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-xl">
                  <Building className="w-6 h-6 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">Publishers</p>
                    <p className="text-gray-700">{book.publisher.slice(0, 5).join(', ')}</p>
                    {book.publisher.length > 5 && (
                      <p className="text-sm text-gray-600 mt-1">+{book.publisher.length - 5} more</p>
                    )}
                  </div>
                </div>
              )}

              {book.isbn && book.isbn.length > 0 && (
                <div className="flex items-start space-x-3 bg-slate-50 p-4 rounded-xl">
                  <Hash className="w-6 h-6 text-slate-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">ISBN</p>
                    <p className="text-gray-700 font-mono text-sm">{book.isbn[0]}</p>
                    {book.isbn.length > 1 && (
                      <p className="text-sm text-gray-600 mt-1">+{book.isbn.length - 1} more</p>
                    )}
                  </div>
                </div>
              )}

              {book.subject && book.subject.length > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                  <p className="font-semibold text-gray-700 mb-3">Subjects</p>
                  <div className="flex flex-wrap gap-3">
                    {book.subject.slice(0, 10).map((subject, index) => (
                      <span
                        key={index}
                        className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm rounded-full font-medium shadow-sm"
                      >
                        {subject}
                      </span>
                    ))}
                    {book.subject.length > 10 && (
                      <span className="inline-block px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-full font-medium">
                        +{book.subject.length - 10} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-gray-200">
                <a
                  href={bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  View on Open Library
                  <Globe className="w-5 h-5 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;