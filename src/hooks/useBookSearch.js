import { useState, useCallback } from 'react';
import { searchBooks } from '../services/bookApi';

/**
 * Custom hook for book search functionality
 * @returns {Object} Search state and functions
 */
export const useBookSearch = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentParams, setCurrentParams] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const performSearch = useCallback(async (params, append = false) => {
    if (!params.query.trim()) {
      setBooks([]);
      setTotalResults(0);
      setHasMore(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await searchBooks(params);
      
      if (append) {
        setBooks(prev => [...prev, ...result.docs]);
      } else {
        setBooks(result.docs);
      }
      
      setTotalResults(result.numFound);
      setHasMore(result.docs.length === params.limit && (params.offset + params.limit) < result.numFound);
      setCurrentParams(params);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      if (!append) {
        setBooks([]);
        setTotalResults(0);
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(async (params) => {
    await performSearch(params, false);
  }, [performSearch]);

  const loadMore = useCallback(async () => {
    if (!currentParams || !hasMore) return;
    
    const newParams = {
      ...currentParams,
      offset: currentParams.offset + currentParams.limit
    };
    
    await performSearch(newParams, true);
  }, [currentParams, hasMore, performSearch]);

  return {
    books,
    loading,
    error,
    totalResults,
    searchBooks: handleSearch,
    loadMore,
    hasMore
  };
};