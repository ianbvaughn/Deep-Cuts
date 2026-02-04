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

/** @type {string} */
const clientId = process.env.CLIENT_ID;
/** @type {string} */
const clientSecret = process.env.CLIENT_SECRET;
const PORT = process.env.PORT || 10000;

let token = null;
let tokenExpiry = 0;
let header = '';

/**
 * Returns a random string of length 'length'.
 * @param {int} length
 */
let genRandomStr = function (length) {
      let text = '';
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
}

/**
 * Returns a Spotify Web API access token. Gets a new token if the previous token has expired.
 * @returns {Promise<void>}
 */
async function getAccessToken() {
      const now = Date.now();
      if(token && (tokenExpiry - now > 60000)) {
            return;
      }

      console.log("Info: Fetching new token");

      [token, tokenExpiry] = await spotify.getToken(clientId, clientSecret);
      header = spotify.getAuthHeader(token);
      tokenExpiry = (tokenExpiry*1000) + Date.now();
}

app.listen(PORT, '0.0.0.0', async () => {
   getAccessToken();
   console.log(`Info: Token`, token ? 'SET':'NOT SET');
   console.log(`Info: Server listening on port ${PORT}`);
});

/**
 * 1. Get artist.
 */

app.get('/spotify/artist/:name', async(req,res) => {
      getAccessToken();
      const name = req.params.name;
      const artist = await spotify.searchForArtist(token, header, name);
      res.type('application/json').send(artist);
});

app.get('/spotify/albums/:id', async(req,res) => {
      getAccessToken();
      const id = req.params.id;
      const albums = await spotify.getAlbumsByArtist(token, header, id);
      res.type('application/json').send(albums);
});

app.get('/spotify/tracks/:id', async(req,res) => {
      getAccessToken();
      const id = req.params.id;
      const tracks = await spotify.getTracksByAlbum(token, header, id);
      res.type('application/json').send(tracks);
});

app.get('/spotify/track/:id', async(req,res) => {
      getAccessToken();
      const id = req.params.id;
      const track = await spotify.getTrackInfo(token, header, id);
      res.type('application/json').send(track);
});

app.get('/spotify/auth/login', async(req,res) => {
      let scope = "streaming " +
                          "user-read-email " +
                          "user-read-private"

      let state = genRandomStr(16)

      // This formats our dictionary as SearchParams, so we can easily just append it to our request below.
      let auth_query_parameters = new URLSearchParams({
            response_type: "code",
            client_id: clientId,
            scope: scope,
            redirect_uri: "http://127.0.0.1:10000/spotify/auth/callback",
            state: state
      });

      // This returns the authorization code, along with the state to ensure that the request is unchanged.
      res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
});

app.get('/spotify/auth/callback', async(req,res) => {

      // TODO: Move this functionality to the 'spotify-model.mjs/getToken()' function

      const code = req.query.code;

      const params = new URLSearchParams({
            code: code,
            redirect_uri: "http://127.0.0.1:10000/spotify/auth/callback",
            grant_type: 'authorization_code'
      });

      const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                  'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
                  'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
      });

      const data = await response.json();

      if (response.ok) {
            token = data.access_token;
            // TODO: Persist user tokens in db
            res.redirect('/');
      } else {
            res.status(400).send('Failed to get access token');
      }
});
