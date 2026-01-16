import 'dotenv/config';
import { getAlbumsByArtist, getAuthHeader, getToken, getTrackInfo, getTracksByAlbum, searchForArtist } from './spotify-model.mjs'

test('Retrieve token', async () => {
   const token = await getToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
   expect(token).toBeDefined();
});

test('Get artist', async () => {
   const token = await getToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
   const header = getAuthHeader(token);
   const artist = await searchForArtist(token, header, 'Radiohead');
   expect(artist[0].id).toBeDefined();
});

test('Get albums', async () => {
   const token = await getToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
   const header = getAuthHeader(token);
   const albums = await getAlbumsByArtist(token, header, '4Z8W4fKeB5YxbusRsdQVPb');
   expect(albums[0].id).toBeDefined();
});

test('Get tracks', async () => {
   const token = await getToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
   const header = getAuthHeader(token);
   const tracks = await getTracksByAlbum(token, header, '2ix8vWvvSp2Yo7rKMiWpkg');
   expect(tracks[0].id).toBeDefined();
});

test('Get track details', async () => {
   const token = await getToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
   const header = getAuthHeader(token);
   const track = await getTrackInfo(token, header, '4mRSbPLnOm54ttkTYvxxSY');
   expect(track.id).toBeDefined();
});