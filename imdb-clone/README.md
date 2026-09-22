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

- Node.js 18+
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

This app uses a Groq API key for movie recommendations. Create a `.env` file in the project root and add:

```bash
VITE_GROQ_API_KEY=your_groq_api_key_here
```

You can get your API key from the Groq cloud platform.

### Run the app

```bash
npm run dev
```

The app will start in development mode and be available at the local Vite URL shown in the terminal.

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
- Recommendation generation depends on the Groq API key being correctly configured.
- The app is designed as a front-end movie browsing experience and can be extended with a backend or real database in the future.

## License

This project is for educational/demo purposes.
