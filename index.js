var express = require('express');
var bodyParser = require('body-parser');
var SpotifyBackend = require('./backends/SpotifyBackend.js');
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodie

var songs = [];
var currentDirectory = (process.env.PORT) ? process.cwd() : __dirname;
app.set("port", process.env.PORT || 3000);


app.get('/api/searchMusic', (req, res) => {
  var q = req.query.q;
  SpotifyBackend.searchSongs(q).then(function(data) {
    var tracks = data.body.tracks.items;
    var ourFormatTracks = [];
    tracks.forEach((item) => {
      var track = {
        "backend": SpotifyBackend.backendID(),
        "info": {
          "id": item.id,
          "name": item.name,
          "artist": "Test Artist",
          "length": item.duration_ms / 1000
        }
      }
      ourFormatTracks.push(track);
    });
  });
});

app.post('/api/addSong', (req, res) => {

});

app.get("*", function(req, res) {
    res.status(404).send("File not found");
});

app.listen(app.get("port"), function() {
    console.log("Server started on port " + app.get("port"));
});
