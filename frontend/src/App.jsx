import { useEffect, useState } from 'react'
import './App.css'
import ArtistCollection from './components/ArtistCollection'
import ArtistHeader from './components/ArtistHeader'
import AlbumCollection from './components/AlbumCollection'
import TrackCollection from './components/TrackCollection'
import AlbumHeader from './components/AlbumHeader'

function App() {

  const [token, setToken] = useState(null);
  const [artistName, setArtistName] = useState('');
  const [artist, setArtist] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState([]);
  const [tracks, setTracks] = useState([]);

  const API_URL = import.meta.env.VITE_API_BASE_URL || '';

  // const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:10000";

  const search = async(e) => {

    e.preventDefault();
    setSelectedArtist([]);
    setSelectedAlbum([]);
    setAlbums([]);
    setTracks([]);

    const response = await fetch(
      `${API_URL}/spotify/artist/${artistName}`,
        {
          credentials: 'include',
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      }
    );

    const data = await response.json();
    setArtist(data);

  }

  const getAlbums = async() => {
    
    setTracks([]);
    setSelectedAlbum([]);
    const response = await fetch(
      `${API_URL}/spotify/albums/${selectedArtist.id}`,
      {
        credentials: 'include',
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      }
    );

    const data = await response.json();
    setAlbums(data);
  }

  const getTracks = async() => {
    
    const response = await fetch(
      `${API_URL}/spotify/tracks/${selectedAlbum.id}`,
      {
        credentials: 'include',
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      }
    );

    const data = await response.json();
    setTracks(data);
  }

  const getToken = async(e) => {
    e.preventDefault();
    window.location.href = `${API_URL}/spotify/auth/login`;
  };

  useEffect(() => {
    fetch(`${API_URL}/spotify/api/token`, {
      credentials: 'include'
    })
        .then(res => res.ok ? res.json() : null)
        .then(data => setToken(data))
        .catch(() => setToken(null));
  }, []);

  useEffect(() => {
    if (selectedArtist?.id) getAlbums();
  }, [selectedArtist]);

  useEffect(() => {
    if (selectedAlbum?.id) getTracks();
  }, [selectedAlbum]);

  return (
    <>
      <div className="bodyContainer">
        <div className="bodyChildLeft">
          <div className="grid-item item-1">
            <h1>Deep Cuts</h1>
            <p>find the next banger</p>
            {token &&
            <form>
              <p>
              <input
                name="name"
                placeholder="Enter an artist name:"
                onChange={e => setArtistName(e.target.value)}>
              </input>
              </p>
              <p>
              <button
                type="submit"
                onClick = {search}>
              Search</button>
              </p>
            </form> }
            {!token &&
                <button
                    type="button"
                    onClick = {getToken}>
                  Login to Spotify</button>
            }
          </div>
          {artist.length > 0 && <div className="grid-item item-2">
            {<ArtistHeader className="infoHeader" artist={selectedArtist}/>}
            {<AlbumHeader className="infoHeader" album={selectedAlbum}/>}
          </div>}
        </div>

        {artist.length > 0 && <div className="bodyChildRight">
          <div className="container">
            
            {artist.length > 0 && 
            selectedArtist.length < 1 && 
            <>
            <p>Select an Artist</p>
            <div className="children">
              <ArtistCollection artists={artist} setSelectedArtist={setSelectedArtist}/>
            </div>
            </>}
            
            {albums.length > 0 && 
            selectedAlbum.length < 1 && 
            <>
            <p>Select an Album</p>
            <div className="children">
              <AlbumCollection albums={albums} setSelectedAlbum={setSelectedAlbum}/>
            </div>
            </>}
            {tracks.length > 0 && <div className="children">
              <TrackCollection tracks={tracks}/>
            </div>}
          </div>
        </div>}

      </div>
    </>
  )
}

export default App
