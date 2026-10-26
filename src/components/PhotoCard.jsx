import React from 'react';

/**
 * PhotoCard component displaying the photo, author name, and favourite heart button.
 */
export function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <div
      id={`photo-card-${photo.id}`}
      className="group bg-slate-850 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:border-slate-700 transition-all duration-300 flex flex-col"
    >
      {/* Photo Container */}
      <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden">
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Card Info & Actions */}
      <div className="p-4 flex items-center justify-between gap-3 bg-slate-900">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Author
          </p>
          <h3
            className="text-sm font-semibold text-slate-100 truncate mt-0.5"
            title={photo.author}
          >
            {photo.author}
          </h3>
        </div>

        {/* Heart Icon Button */}
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? `Remove ${photo.author}'s photo from favourites` : `Add ${photo.author}'s photo to favourites`}
          title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={isFavourite}
          id={`fav-btn-${photo.id}`}
          className="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-red-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 shrink-0 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill={isFavourite ? '#ef4444' : 'none'}
            className={`w-5 h-5 transition-transform duration-200 ${
              isFavourite ? 'text-red-500 scale-110' : 'text-slate-400 hover:text-red-400'
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default PhotoCard;
