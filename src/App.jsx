import { useEffect, useState } from 'react'
import './App.css'
import ArtistCollection from './components/ArtistCollection'
import ArtistHeader from './components/ArtistHeader'
import AlbumCollection from './components/AlbumCollection'
import TrackCollection from './components/TrackCollection'
import AlbumHeader from './components/AlbumHeader'

function App() {

  const [artistName, setArtistName] = useState('');
  const [artist, setArtist] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState([]);
  const [tracks, setTracks] = useState([]);

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const search = async(e) => {

    e.preventDefault();
    setSelectedArtist([]);
    setSelectedAlbum([]);
    setAlbums([]);
    setTracks([]);
    const response = await fetch(
      `${API_URL}/spotify/artist/${artistName}`,
      {
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
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      }
    );

    const data = await response.json();
    setTracks(data);
  }

  // useEffect( () => {
  //   getToken();
  // });

  useEffect( () => {
    getAlbums();
  }, [selectedArtist]);

  useEffect( () => {
    getTracks();
  }, [selectedAlbum]);

  return (
    <>
      <h1>Deep Cuts</h1>
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
        {<ArtistHeader className="infoHeader" artist={selectedArtist}/>}
        {<AlbumHeader className="infoHeader" album={selectedAlbum}/>}
        <div class="container">
          
          {artist.length > 0 && 
          selectedArtist.length < 1 && 
          <>
          <p>Select an Artist</p>
          <div class="children">
            <ArtistCollection artists={artist} setSelectedArtist={setSelectedArtist}/>
          </div>
          </>}
          
          {albums.length > 0 && 
          selectedAlbum.length < 1 && 
          <>
          <p>Select an Album</p>
          <div class="children">
            <AlbumCollection albums={albums} setSelectedAlbum={setSelectedAlbum}/>
          </div>
          </>}
          {tracks.length > 0 && <div class="children">
            <TrackCollection tracks={tracks}/>
          </div>}
        </div>
      </form>
    </>
  )
}

export default App
