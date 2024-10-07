# Movie Watchlist App

A movie watchlist application that allows multiple users to search for movies, view details about them, and add or remove them from their personal watchlists.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Caching with TanStack Query](#caching-with-tanstack-query)
- [API Key Requirement](#api-key-requirement)
- [License](#license)

## Features

- **User Authentication**: Users can log in and log out.
- **Search Functionality**: Users can search for movies by name.
- **Movie Details**: View detailed information about each movie.
- **Watchlist Management**: Add and remove movies from personal watchlists.
- **Responsive Design**: Mobile-friendly UI.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: For type checking and enhancing the developer experience.
- **Redux Toolkit**: For state management.
- **Axios**: For data fetching from the OMDB API.
- **TanStack Query**: For caching and managing server state.
- **React Router**: For routing and navigation.
- **Tailwind CSS**: For styling the application.

## Installation

To get started, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/tusharr911/movieList.git
   cd movieList

   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up the API key**:

   Create a .env file in the root directory of the project.
   Add your OMDB API key:

   ```bash
   VITE_OMDB_API_KEY='YOUR_API_KEY_HERE'
   ```

4. **Start the development server:**:
   ```bash
   npm run dev
   ```

Usage

    Search for Movies: Enter the movie name in the search bar.
    View Details: Click on a movie card to see its details.
    Add/Remove from Watchlist: Use the buttons provided on each movie card to manage your watchlist.

Caching with TanStack Query

TanStack Query is implemented to enhance data fetching efficiency and manage server state seamlessly. The application utilizes useQuery hooks to fetch movie data from the OMDB API based on user input.
How Caching Works:

    Automatic Caching: When a query is made, the fetched data is stored in cache automatically. Subsequent requests for the same movie data do not trigger additional API calls unless the cache is stale.
    Stale Time: The cache can be configured with a staleTime property to determine how long the data remains fresh. In this app, the stale time is set to 5 minutes.
    Window Refocus: The queries can be configured to not refetch data when the window regains focus, which improves performance and reduces unnecessary network calls.

This caching mechanism ensures that multiple data fetching requests for the same movie are avoided, leading to improved performance and user experience.
API Key Requirement

To use the OMDB API, you need to obtain a free API key. Follow these steps:

    Go to OMDB API.
    Sign up for a free account and get your API key.
    Add the API key to your .env file as mentioned in the installation section.

License

This project is licensed under the MIT License - see the LICENSE file for details.
