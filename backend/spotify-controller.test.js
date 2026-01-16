import 'dotenv/config';

test('Server is responding', async () => {
   const url = `${process.env.API_BASE_URL}/spotify/artist/Radiohead`;
   const response = await fetch(url);
   expect(response.status).toBe(200);
});

test('Has artist data', async () => {
   const url = `${process.env.API_BASE_URL}/spotify/artist/Radiohead`;
   const response = await fetch(url);
   expect((await response.text()).length).toBeGreaterThan(0);
});

test('Has album data', async () => {
   const url = `${process.env.API_BASE_URL}/spotify/albums/4Z8W4fKeB5YxbusRsdQVPb`;
   const response = await fetch(url);
   expect((await response.text()).length).toBeGreaterThan(0);
});

test('Has tracks data', async () => {
   const url = `${process.env.API_BASE_URL}/spotify/tracks/2ix8vWvvSp2Yo7rKMiWpkg`;
   const response = await fetch(url);
   expect((await response.text()).length).toBeGreaterThan(0);
});

test('Has detailed track data', async () => {
   const url = `${process.env.API_BASE_URL}/spotify/track/4mRSbPLnOm54ttkTYvxxSY`;
   const response = await fetch(url);
   expect((await response.text()).length).toBeGreaterThan(0);
});