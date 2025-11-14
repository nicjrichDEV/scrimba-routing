import React from "react";

/**
 * Custom hook for data fetching with loading and error states
 * @param {string} url - The API endpoint to fetch from
 * @returns {Object} - Object containing data, loading state, and error state
 */
export default function useFetch(url) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    setLoading(true);
    setError(null);

    fetch(url, { signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!signal.aborted) {
          setData(data);
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error(err);
          setError(err.message);
        }
      })
      .finally(() => {
          if(!signal.aborted) {
              setLoading(false);
          }
      });

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, loading, error };
}
