import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch 30 photos from the Picsum API on mount.
 * Returns photos, loading, and error states.
 */
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('https://picsum.photos/v2/list?limit=30');

        if (!response.ok) {
          throw new Error(`Failed to fetch photos: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (isMounted) {
          setPhotos(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'An error occurred while fetching photos.');
          setLoading(false);
        }
      }
    };

    fetchPhotos();

    return () => {
      isMounted = false;
    };
  }, []);

  // Return an object that is also iterable as an array [photos, loading, error]
  // to ensure compatibility with any consumption style
  const result = { photos, loading, error };
  result[Symbol.iterator] = function* () {
    yield photos;
    yield loading;
    yield error;
  };

  return result;
}

export default useFetchPhotos;
