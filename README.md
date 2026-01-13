Express.js backend server that provides API endpoints for interfacing with the Spotify API, with built-in request logging to a PostgreSQL database.

## Features

- **Spotify API Integration**: Seamless communication with Spotify's Web API
- **RESTful API Endpoints**: Clean, organized endpoints for client consumption
- **Request Logging**: Automatic logging of all API calls to PostgreSQL
- **Middleware Architecture**: Modular middleware for logging and error handling

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **API**: Spotify Web API

## API Endpoints

- `GET /spotify/artist/:name` - Returns a list containing the top 15 artists for the given search criteria.
- `GET /spotify/albums/:id` - Returns a list of all albums associated with a given artist.
- `GET /spotify/tracks/:id` - Returns a list of all tracks associated with a given album.
- `GET /spotify/track/:id` - Returns all data associated with a given track.
