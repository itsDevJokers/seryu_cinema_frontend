// src/hooks/useFetchMovies.ts

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const useFetchMovies = (url: string, options: any, debounceDelay?: number) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceTimer = useRef<any>(null);

  useEffect(() => {
    if (!url) return;

    if (debounceDelay) {
      // Clear the existing timer if it exists
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      
      // Set a new timer
      debounceTimer.current = setTimeout(() => {
        fetchData(url);
      }, debounceDelay);
    } else {
      fetchData(url);
    }

    // Cleanup function to clear the timer when the component unmounts
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [url]);

  const fetchData = (requestUrl: string) => {
    setLoading(true);
    setData(null);
    setError(null);

    const source = axios.CancelToken.source(); // To cancel request if the component unmounts

    axios.get(requestUrl, { ...options, cancelToken: source.token })
      .then(response => {
        setData(response.data); // Set data from API response
        setLoading(false);
      })
      .catch(error => {
        if (!axios.isCancel(error)) {
          setError(error);
          setLoading(false);
        }
      });

    // Cleanup function to cancel the request if the component unmounts
    return () => {
      source.cancel('Component got unmounted');
    };
  };

  return { data, loading, error };
};

export default useFetchMovies;