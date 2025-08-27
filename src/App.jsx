import React, { useState } from 'react';
import { BookOpen, Users, Hash, Globe } from 'lucide-react';
import { useBookSearch } from './hooks/useBookSearch';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import BookGrid from './components/BookGrid';
import BookModal from './components/BookModal';
import LoadMoreButton from './components/LoadMoreButton';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const { books, loading, error, totalResults, searchBooks, loadMore, hasMore } = useBookSearch();
  const [selectedBook, setSelectedBook] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (params) => {
    setHasSearched(true);
    await searchBooks(params);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Find Your Perfect Book
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Search through millions of books by title, author, ISBN, or subject. 
            Discover detailed information, ratings, and find your next favorite read.
          </p>
        </div>

        {/* Search Form */}
        <div className="mb-12">
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>

        {/* Results Summary */}
        {hasSearched && !loading && books.length > 0 && (
          <div className="mb-8 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200">
              <p className="text-gray-700">
                Found <span className="font-bold text-blue-600">{totalResults.toLocaleString()}</span> books
              {totalResults > books.length && ` (showing first ${books.length})`}
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-12">
            <ErrorMessage 
              message={error} 
              onRetry={() => window.location.reload()} 
            />
          </div>
        )}

        {/* No Results */}
        {hasSearched && !loading && books.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto shadow-lg border border-gray-200">
              <div className="text-gray-400 mb-6">
                <svg className="w-20 h-20 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">No books found</h3>
              <p className="text-gray-600">Try adjusting your search terms or search by a different category.</p>
            </div>
          </div>
        )}

        {/* Book Grid */}
        <BookGrid books={books} onBookClick={handleBookClick} loading={loading} />

        {/* Load More Button */}
        <LoadMoreButton onLoadMore={loadMore} loading={loading} hasMore={hasMore} />

        {/* Book Details Modal */}
        {selectedBook && (
          <BookModal
            book={selectedBook}
            isOpen={!!selectedBook}
            onClose={handleCloseModal}
          />
        )}

        {/* Welcome State */}
        {!hasSearched && (
          <div className="text-center py-20">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Ready to discover amazing books?
              </h3>
              <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
                Use the search above to find books by title, author, ISBN, or explore by subject. 
                Get detailed information including covers, ratings, and publication details.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="font-semibold text-gray-800 mb-2">Search by Title</div>
                  <div className="text-gray-600 text-sm">Find specific books</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="font-semibold text-gray-800 mb-2">Search by Author</div>
                  <div className="text-gray-600 text-sm">Discover all works</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                    <Hash className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="font-semibold text-gray-800 mb-2">Search by ISBN</div>
                  <div className="text-gray-600 text-sm">Exact book lookup</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                    <Globe className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="font-semibold text-gray-800 mb-2">Browse Subjects</div>
                  <div className="text-gray-600 text-sm">Explore topics</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600">
            <p className="mb-3 text-lg">
              Powered by <a href="https://openlibrary.org" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">Open Library API</a>
            </p>
            <p className="text-gray-500">
              Built with ❤️ for college students and book lovers everywhere
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;