# Celebrare Frontend React Internship Assignment - Photo Gallery

A responsive and modern Photo Gallery web application built using **React**, **Vite**, and **Tailwind CSS**. It fetches curated photos from the Picsum API, supports real-time author filtering, and manages favourite photos with persistent local storage.

---

## 🚀 Features

1. **API Integration & Custom Hook (`useFetchPhotos`)**
   - Fetches 30 photos on page load from `https://picsum.photos/v2/list?limit=30`.
   - Returns `{ photos, loading, error }`.
   - Displays an animated loading spinner while fetching and user-friendly error state on failure.

2. **Responsive Grid Layout**
   - **Desktop (>= 1024px)**: 4 columns (`lg:grid-cols-4`)
   - **Tablet (768px - 1023px)**: 2 columns (`md:grid-cols-2`)
   - **Mobile (< 768px)**: 1 column (`grid-cols-1`)
   - Each card displays the photo, author name, and a heart icon button.

3. **Real-time Search Filter**
   - Instant search filter by author name in real time without page reload or extra API calls.
   - Optimized with `useCallback` for the search handler and `useMemo` for calculating the filtered photo list.

4. **Favourites Management**
   - Implemented using React's `useReducer` hook (no `useState` for favourites).
   - Toggles favourite status on clicking the heart icon button.
   - Automatically saves and persists favourites in `localStorage` across page refreshes.

5. **Clean Architecture & Code Quality**
   - Strictly functional components and React Hooks.
   - No external UI component libraries used (pure Tailwind CSS and accessible SVG icons).
   - Clean, modular file organization.

---

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

---

## 📁 Project Structure

```
├── public/
├── src/
│   ├── components/
│   │   ├── Gallery.jsx       # Main gallery view with search, grid, and favourites
│   │   └── PhotoCard.jsx     # Individual card displaying photo, author, & heart button
│   ├── hooks/
│   │   └── useFetchPhotos.js # Custom hook to fetch photos from Picsum API
│   ├── App.jsx               # Root component rendering Gallery
│   ├── index.css             # Tailwind CSS base styles
│   └── main.jsx              # Application entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 💻 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/lokeshrathore1509/CELEBRARE_INTERNSHIP_ASSIGNMNET.git
cd CELEBRARE_INTERNSHIP_ASSIGNMNET
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
```
