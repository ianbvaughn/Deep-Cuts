# Deep Cuts

A full-stack application that interfaces with the Spotify API to explore music data, featuring an Express.js backend with PostgreSQL logging, a React frontend, and dbt for data transformation.

## Overview

Deep Cuts provides a seamless way to search and explore Spotify's music catalog, including artists, albums, and tracks. The application automatically logs all API interactions to a PostgreSQL database for analytics and monitoring purposes.

## Features

- **Spotify API Integration**: Full access to Spotify's Web API for music discovery
- **Artist Search**: Find artists by name with top 15 results
- **Album Discovery**: Browse complete discographies for any artist
- **Track Details**: Access comprehensive track information and metadata
- **Request Logging**: Automatic logging of all API calls to PostgreSQL
- **Modern UI**: React-based frontend for intuitive music exploration
- **Data Analytics**: dbt integration for data transformation and analysis

## Architecture

```
Deep-Cuts/
├── backend/          # Express.js API server
├── frontend/         # React application
└── dbt/             # Data transformation models
```

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **API**: Spotify Web API

### Frontend
- **Framework**: React
- **Languages**: JavaScript, CSS, HTML

### Data
- **Transformation**: dbt (data build tool)

## API Endpoints

### Artist Search
```
GET /spotify/artist/:name
```
Returns the top 15 artists matching the search criteria.

**Example**: `/spotify/artist/radiohead`

### Album Listing
```
GET /spotify/albums/:id
```
Returns all albums for a given artist ID.

**Example**: `/spotify/albums/4Z8W4fKeB5YxbusRsdQVPb`

### Track Listing
```
GET /spotify/tracks/:id
```
Returns all tracks for a given album ID.

**Example**: `/spotify/tracks/6400dnyeDyD2mIFHfkwHVI`

### Track Details
```
GET /spotify/track/:id
```
Returns comprehensive data for a specific track.

**Example**: `/spotify/track/3a0UOgDWw2pTajw85QPMiz`

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- Spotify Developer Account
- npm or yarn
- Container tool (Docker, OrbStack, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ianbvaughn/Deep-Cuts.git
cd Deep-Cuts
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Start local Supabase instance and pull latest schema changes
```
cd backend
npx supabase start
npx supabase db reset # To ensure that schema is up to date
npx supabase migration new <name> # Write SQL in this file
```

5. Configure environment variables:
Create a `.env` file in the `/backend` directory with your Spotify API credentials:
```
CLIENT_ID=<spotify_api_client_id>
CLIENT_SECRET=<spotify_api_client_secret>
CONNECTION_STRING=postgresql://<username>:<password>@localhost:<port>/<db_name>?sslmode=disable
API_BASE_URL=http://localhost:10000
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application should now be running with the backend on `http://localhost:10000` (or your configured port) and the frontend on `http://localhost:5173`.

## Data Logging

All API requests are automatically logged to PostgreSQL, capturing:
- Request timestamp
- Endpoint accessed
- Query parameters
- Response status
- Response time

This data can be analyzed using the included dbt models for insights into usage patterns and API performance.

## Development

### Project Structure

- **backend/**: Express.js server with middleware for logging and Spotify API integration
- **frontend/**: React application with components for searching and displaying music data
- **dbt/**: Data transformation models for analytics on logged API requests

### Middleware

The backend includes modular middleware for:
- Request logging
- Error handling
- Authentication with Spotify API
- Response formatting

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push -u origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for providing comprehensive music data
- The Express.js and React communities for excellent frameworks and documentation

## Contact

Ian Vaughn - [@ianbvaughn](https://github.com/ianbvaughn)
Project Link: [https://github.com/ianbvaughn/Deep-Cuts](https://github.com/ianbvaughn/Deep-Cuts)
