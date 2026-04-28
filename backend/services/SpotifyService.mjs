// TODO: Refactor getToken() to implement token fetch for both global and user tokens

async function searchForArtist(token, artistName) {
  
  const url = 'https://api.spotify.com/v1/search';
  const q = `?q=${artistName}&type=artist&limit=15`;
  const queryUrl = url + q;

  const response = await token.authenticatedFetch(queryUrl,'GET');

  const jsonResult = await response.json();
  const items = jsonResult.artists.items;

  if (items.length === 0) {
    console.log('No artist found.');
    return null;
  }

  return items;
}

async function getAlbumsByArtist(token, artistId) {

  const url = `https://api.spotify.com/v1/artists/${artistId}/albums`;

  const response = await token.authenticatedFetch(url, 'GET');

  const jsonResult = await response.json();
  return jsonResult.items;
}

async function getTracksByAlbum(token, albumId) {
  /**
   * Get all songs associated with a particular album ID.
   * 
   * @param {string} token
   * @param {string} albumId
   * @returns {Promise<Array>}
   */
  const url = `https://api.spotify.com/v1/albums/${albumId}/tracks`;

  const response = await token.authenticatedFetch(url, 'GET');

  const jsonResult = await response.json();
  return jsonResult.items;
}

async function getTrackInfo(token, trackId) {
  /**
   * Get all info associated with a particular track.
   * 
   * @param {string} token
   * @param {string} trackId
   * @returns {Promise<Object>}
   */
  const url = `https://api.spotify.com/v1/tracks/${trackId}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: token.headers
  });

  return await response.json();

}

export {
  searchForArtist,
  getAlbumsByArtist,
  getTracksByAlbum,
  getTrackInfo }