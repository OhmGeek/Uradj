var SpotifyWebApi = require('spotify-web-api-node');
var keys = require('./backend_keys.js');
var spotify = new SpotifyWebApi(keys.spotify_keys);
console.log(keys.spotify_keys);

function getToken() {
  spotify.clientCredentialsGrant()
  .then(function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotify.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  });
}
getToken()
setInterval(getToken, 55 * 60 * 60 * 1000); // every 55 mins, request token updated.

module.exports = {
  searchSongs: function(searchTerm) {
    // this takes a search term,
    // and returns a list of search results in
    // our format
    console.log(searchTerm);
    return new Promise(function(resolve, reject) {
      spotify.searchTracks(searchTerm).then((data) => {
        var tracks = data.body.tracks.items;
        var ourFormatTracks = [];
        var getArtist = function(artistArray) {
          let artistStr = "";
          artistArray.forEach(function(artist) {
            artistStr += artist.name;
            artistStr += ", ";
          });
          artistStr = artistStr.slice(0, -2);
          return artistStr;
        }
        tracks.forEach((item) => {
          var track = {
            "backend": "spotify",
            "info": {
              "id": item.id,
              "name": item.name,
              "artist": getArtist(item.artists),
              "length": item.duration_ms / 1000,
            }
          }
          ourFormatTracks.push(track);
        });
        resolve(ourFormatTracks);
      }, function(err) {
        reject(err);
      });
    });

  },





}
