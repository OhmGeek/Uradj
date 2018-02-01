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
    res.send(data);
  });
});

app.post('/api/addSong', (req, res) => {
  var songToAdd = req.body.song;
  songs.push(songToAdd);

  // print queue for testing.
  console.log("Current Queue:");
  console.log(songs);

  if(songToAdd in songs) {
    res.send({
      status: 200,
      info: {
        err: "Song already in the queue."
      }
    });
  }
  else {
    res.send({
      "status": 200,
      "info": {
        "message": "Song Added Successfully"
      }
    });
  }
});

app.get("*", function(req, res) {
    res.status(404).send("File not found");
});

app.listen(app.get("port"), function() {
    console.log("Server started on port " + app.get("port"));
});
