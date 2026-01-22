import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { apiLogger } from './api-logger.mjs';
import * as spotify from './spotify-model.mjs';

const app = express();
app.set('trust proxy', true)
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(apiLogger);

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const PORT = process.env.PORT || 10000;

let token = '';
let header = '';

app.listen(PORT, '0.0.0.0', async () => {
   token = await spotify.getToken(clientId, clientSecret);
   header = await spotify.getAuthHeader(token); 
   console.log(`Info: Token`, token ? 'SET':'NOT SET');
   console.log(`Info: Server listening on port ${PORT}`);
});

/**
 * 1. Get artist.
 */

app.get('/spotify/artist/:name', async(req,res) => {
      const name = req.params.name;
      const artist = await spotify.searchForArtist(token, header, name);
      res.type('application/json').send(artist);
});

app.get('/spotify/albums/:id', async(req,res) => {
      const id = req.params.id;
      const albums = await spotify.getAlbumsByArtist(token, header, id);
      res.type('application/json').send(albums);
});

app.get('/spotify/tracks/:id', async(req,res) => {
      const id = req.params.id;
      const tracks = await spotify.getTracksByAlbum(token, header, id);
      res.type('application/json').send(tracks);
});

app.get('/spotify/track/:id', async(req,res) => {
      const id = req.params.id;
      const track = await spotify.getTrackInfo(token, header, id);
      res.type('application/json').send(track);
});