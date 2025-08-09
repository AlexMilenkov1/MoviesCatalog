# 🎬 Movies Catalog

A modern Single Page Application (SPA) for browsing, searching, and discovering trending movies. Built with React, Vite, Tailwind CSS, and Appwrite.

## 🚀 Features

- 🔍 **Search Movies:** Instantly search for movies using The Movie Database (TMDB) API.
- 📈 **Trending Section:** View the most popular movies right now.
- 🎨 **Responsive Design:** Beautiful and mobile-friendly UI powered by Tailwind CSS.
- ⚡ **Debounced Search:** Fast, efficient search with reduced API calls.
- 🗂️ **Appwrite Integration:** Store and retrieve trending movies and search statistics.
- 🖼️ **Custom Hero & Background:** Eye-catching hero section with background imagery.

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Appwrite](https://appwrite.io/)
- [TMDB API](https://www.themoviedb.org/documentation/api)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/movies-catalog.git

# Navigate to the project folder
cd movies-catalog

# Install dependencies
npm install

# Create a .env.local file in the project root and add your TMDB API key
VITE_TMDB_API_KEY=your_tmdb_api_key_here

# Start the development server
npm run dev
```

## ⚙️ Configuration

- Place your TMDB API key in `.env.local` as shown above.
- Make sure your images (e.g., `hero.png`, `hero-bg.png`) are in the `public/images` folder.

## 📁 Project Structure

```
movies-catalog/
├── public/
│   └── images/
├── src/
│   ├── components/
│   ├── assets/
│   ├── App.jsx
│   ├── appwrite.js
│   └── main.jsx
├── .env.local
├── package.json
├── README.md
└── vite.config.js
```

## 🖥️ Screenshots

> ![App Screenshot](screenshot.png)
> ![App Screenshot](screenshot_2.png)

## 📝 License

This project is licensed under the MIT License.
