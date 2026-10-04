# IMDb Clone

A modern movie browsing and watchlist app inspired by IMDb, built with React and Vite. Users can explore popular and trending movies, view detailed information, add titles to a personal watchlist, and get AI-powered movie recommendations based on their saved list.

## Features

- Browse popular and trending movies
- Search for movies by title
- View complete movie details and metadata
- Add or remove movies from a persistent watchlist
- Navigate between homepage, watchlist, and movie detail pages
- AI-based recommendation suggestions using Groq
- Responsive UI with a polished dark movie-themed design

## Tech Stack

- React 19
- Vite
- React Router
- Axios
- Tailwind CSS
- Groq API for recommendations

## Project Structure

```bash
imdb-clone/
├── public/
├── src/
│   ├── components/
│   ├── features/
│   ├── routes/
│   ├── services/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 22.12+
- npm or yarn

### Installation

1. Clone the repository.
2. Navigate to the project folder:

```bash
cd imdb-clone
```

3. Install dependencies:

```bash
npm install
```

### Environment Variables

Movie requests and recommendations run through Netlify Functions so API keys never enter the browser bundle. Configure `TMDB_API_KEY` and `GROQ_API_KEY` in Netlify's environment variables with the **Functions** scope, and mark both as secrets. The functions also accept the existing `VITE_TMDB_API_KEY` and `VITE_GROQ_API_KEY` names for migration, but these must be available to Functions, not just Builds. Prefer the unprefixed names for new configuration.

Set `VITE_TMDB_IMAGE_BASE` to TMDB's public image base URL with the **Builds** scope. It is a public URL, not a secret; do not mark it as containing secret values. `VITE_TMDB_BASE_URL` is no longer needed: movie requests use the fixed TMDB API host on the server. Vite only exposes the image-base variable, not the API-key variables.

For local development, put the same variable names in an untracked `.env` file. `.env` and its variants are ignored by Git. Never commit real credentials. If keys have previously been deployed to browsers or committed, rotate them with their providers and update Netlify; removing files or rewriting history does not revoke a leaked key.

### Run the app

```bash
netlify dev --port 8889
```

Open the Netlify Dev URL on port 8889 so both Vite and the server-side API functions are available. `npm run dev` alone serves only the frontend, not the API functions.

### Netlify deployment

Keep the site's base directory set to `imdb-clone`. The checked-in `netlify.toml` publishes only `dist`, configures the API functions, and adds a fallback for client-side routes. Do not publish the source directory. Keep secrets scanning enabled without API-key or build-output exclusions.

### Production build

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Available Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Build the app for production
npm run preview  # Preview the production build
npm run lint     # Run ESLint checks
```

## Notes

- The watchlist is stored in localStorage, so it persists across page refreshes in the browser.
- Recommendation generation depends on the Groq API key being available to Netlify Functions.
- API routes validate incoming requests, apply per-IP rate limits, and return generic provider errors without exposing credentials or raw upstream responses.

## License

This project is for educational/demo purposes.
