import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import { PhotoCard } from './PhotoCard';

const STORAGE_KEY = 'favourites';

/**
 * Initialize favourites list from localStorage
 */
const getInitialFavourites = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading favourites from localStorage:', error);
    return [];
  }
};

/**
 * Reducer for managing the favourites list
 */
function favouritesReducer(state, action) {
  let nextState = state;

  switch (action.type) {
    case 'TOGGLE_FAVOURITE':
    case 'TOGGLE_FAVORITE':
    case 'TOGGLE': {
      const photoId =
        typeof action.payload === 'object' && action.payload !== null
          ? action.payload.id
          : action.payload;

      if (state.includes(photoId)) {
        nextState = state.filter((id) => id !== photoId);
      } else {
        nextState = [...state, photoId];
      }
      break;
    }
    default:
      return state;
  }

  // Persist directly to localStorage upon reducer state update
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  } catch (error) {
    console.error('Error saving favourites in reducer to localStorage:', error);
  }

  return nextState;
}

export function Gallery() {
  // Requirement 2: The Gallery component must use useFetchPhotos
  const { photos, loading, error } = useFetchPhotos();

  // Search input state
  const [searchTerm, setSearchTerm] = useState('');

  // Requirement 5: Use useReducer, not useState, to manage the favourites list
  const [favourites, dispatch] = useReducer(favouritesReducer, [], getInitialFavourites);

  // Requirement 5: Save favourites in localStorage so they persist after refreshing the page
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch (error) {
      console.error('Error saving favourites to localStorage in effect:', error);
    }
  }, [favourites]);

  // Requirement 4: Use useCallback on the search filter handler
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Handler for heart button toggle
  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: photoId });
  }, []);

  // Requirement 4: Use useMemo to calculate the filtered photo list
  const filteredPhotos = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return photos;
    }
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header & Search Section */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Photo Gallery
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore curated photos from Picsum
              </p>
            </div>

            {/* Requirement 4: Search input at the top */}
            <div className="w-full sm:w-80 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
              <input
                id="search-input"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by author name..."
                className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl border border-slate-700/80 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Requirement 2: Show loading spinner while fetching */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-sm font-medium text-slate-300">
              Loading photos...
            </p>
          </div>
        )}

        {/* Requirement 2: Show error message if API request fails */}
        {!loading && error && (
          <div className="max-w-lg mx-auto bg-red-950/40 border border-red-800/80 rounded-2xl p-6 text-center text-red-200 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mx-auto text-red-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 7.5h.008v.008H12v-.008Z"
              />
            </svg>
            <h2 className="text-lg font-semibold text-red-100">Failed to Load Photos</h2>
            <p className="mt-1 text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* Empty search state when photos are loaded but no author matches */}
        {!loading && !error && filteredPhotos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-base">
              No photos found matching &ldquo;{searchTerm}&rdquo;
            </p>
          </div>
        )}

        {/* Requirement 3: Responsive Grid
            Desktop: 4 columns (lg:grid-cols-4)
            Tablet: 2 columns (md:grid-cols-2)
            Mobile: 1 column (grid-cols-1) */}
        {!loading && !error && filteredPhotos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favourites.includes(photo.id)}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Gallery;
