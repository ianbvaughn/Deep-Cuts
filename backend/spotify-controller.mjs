import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { apiLogger } from './api-logger.mjs';
import * as spotify from './services/SpotifyService.mjs';
import {SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, API_BASE_URL} from './config/spotify.mjs'
import { Token } from './models/Token.mjs'

const app = express();
app.set('trust proxy', true)
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
      origin: process.env.FRONTEND_URL || 'http://127.0.0.1:5173',
      credentials: true
}));
app.use(session({
      secret: process.env.SESSION_SECRET || 'your-secret-key',
      resave: true,              // Change to true temporarily
      saveUninitialized: true,   // Change to true temporarily
      name: 'spotify.sid',
      cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: 'lax',
            domain: process.env.COOKIE_DOMAIN || '127.0.0.1',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000
      }
}));
app.use(apiLogger);
app.use((req, res, next) => {
      if (req.session.token && !(req.session.token instanceof Token)) {
            req.session.token = Object.assign(new Token({
                  access_token: '',
                  expires_in: 0,
                  refresh_token: ''
            }), req.session.token);
      }
      next();
});

const PORT = process.env.PORT || 10000;

let token = undefined;

app.listen(PORT, '0.0.0.0', async () => {
   console.log(`Info: Server listening on port ${PORT}`);
});

app.get('/spotify/artist/:name', async(req,res) => {
      const name = req.params.name;
      console.log('Session Token: ', req.session.token)
      const artist = await spotify.searchForArtist(req.session.token, name);
      res.type('application/json').send(artist);
});

app.get('/spotify/albums/:id', async(req,res) => {
      const id = req.params.id;
      const albums = await spotify.getAlbumsByArtist(req.session.token, id);
      res.type('application/json').send(albums);
});

app.get('/spotify/tracks/:id', async(req,res) => {
      const id = req.params.id;
      const tracks = await spotify.getTracksByAlbum(req.session.token, id);
      res.type('application/json').send(tracks);
});

app.get('/spotify/track/:id', async(req,res) => {
      const id = req.params.id;
      const track = await spotify.getTrackInfo(req.session.token, id);
      res.type('application/json').send(track);
});

app.get('/spotify/auth/login', async(req,res) => {
      let scope = "streaming " +
                          "user-read-email " +
                          "user-read-private"

      /**
       * Returns a random string of length 'length'.
       * @param {int} length
       */
      function _genRandomStr(length) {
            let text = '';
            let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

            for (let i = 0; i < length; i++) {
                  text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            return text;
      }

      let state = _genRandomStr(16)

      // This formats our dictionary as SearchParams, so we can easily just append it to our request below.
      let auth_query_parameters = new URLSearchParams({
            response_type: "code",
            client_id: SPOTIFY_CLIENT_ID,
            scope: scope,
            redirect_uri: `${API_BASE_URL}/spotify/auth/callback`,
            state: state
      });

      // This returns the authorization code, along with the state to ensure that the request is unchanged.
      res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
});

app.get('/spotify/auth/callback', async(req,res) => {

      // TODO: Move this functionality to the 'SpotifyService.mjs/getToken()' function

      const code = req.query.code;

      const params = new URLSearchParams({
            code: code,
            redirect_uri: `${API_BASE_URL}/spotify/auth/callback`,
            grant_type: 'authorization_code'
      });

      const headers = {
            'Authorization': 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
      }

      const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: headers,
            body: params
      });

      let data = await response.json();

      if (response.ok) {
            token = new Token(data);
            req.session.token = token;
            req.session.save((err) => {
                  if (err) {
                        console.error('Session save error:', err);
                        return res.status(500).send('Session save failed');
                  }

                  res.redirect(process.env.FRONTEND_URL || 'http://127.0.0.1:5173');
            });
            // TODO: Persist user tokens in db

      } else {
            res.status(400).send('Failed to get access token');
      }
});

app.get('/spotify/api/token', (req,res) => {

      if (req.session.token) {
            res.json(req.session.token);
      } else {
            res.status(401).json({ error: 'Not authenticated' });
      }
});