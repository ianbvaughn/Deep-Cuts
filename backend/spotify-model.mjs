// TODO: Refactor getToken() to implement token fetch for both global and user tokens

async function getToken(clientId, clientSecret) {
  
  const authString = clientId + ':' + clientSecret;
  const authBase64 = Buffer.from(authString).toString('base64');

  const url = 'https://accounts.spotify.com/api/token';

  const headers = {
    'Authorization': 'Basic ' + authBase64,
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  const data = new URLSearchParams({
    grant_type: 'client_credentials'
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: data
  });

  const jsonResult = await response.json();
  return [jsonResult.access_token, jsonResult.expires_in];
}

function getAuthHeader(token) {
  return {
    'Authorization': 'Bearer ' + token
  };
}

async function searchForArtist(token, header, artistName) {
  
  const url = 'https://api.spotify.com/v1/search';
  const q = `?q=${artistName}&type=artist&limit=15`;
  const queryUrl = url + q;

  const response = await fetch(queryUrl, {
    method: 'GET',
    headers: header
  });

  const jsonResult = await response.json();
  const items = jsonResult.artists.items;

  if (items.length === 0) {
    console.log('No artist found.');
    return null;
  }

  return items;
}

async function getAlbumsByArtist(token, header, artistId) {

  const url = `https://api.spotify.com/v1/artists/${artistId}/albums`;

  const response = await fetch(url, {
    method: 'GET',
    headers: header
  });

  const jsonResult = await response.json();
  return jsonResult.items;
}

async function getTracksByAlbum(token, header, albumId) {
  /**
   * Get all songs associated with a particular album ID.
   * 
   * @param {string} token
   * @param {string} albumId
   * @returns {Promise<Array>}
   */
  const url = `https://api.spotify.com/v1/albums/${albumId}/tracks`;

  const response = await fetch(url, {
    method: 'GET',
    headers: header
  });

  const jsonResult = await response.json();
  return jsonResult.items;
}

async function getTrackInfo(token, header, trackId) {
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
    headers: header
  });

  const jsonResult = await response.json();
  return jsonResult;
}

export { getToken, getAuthHeader, searchForArtist, getAlbumsByArtist, getTracksByAlbum, getTrackInfo }