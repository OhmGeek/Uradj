var express = require('express');
var bodyParser = require('body-parser');
var SpotifyBackend = require('./backends/SpotifyBackend.js');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodie

var songs = [];
var currentDirectory = (process.env.PORT) ? process.cwd() : __dirname;
app.set("port", process.env.PORT || 3000);


// ------------- API calls ---------------

io.on('connection', function(conn) {
  conn.on('search', (query) => {
    var q = query.q;
    SpotifyBackend.searchSongs(q).then(function(data) {
      conn.emit('search-result', data);
    })
    .catch((err) => {
      conn.emit('search-result', {err: err});
    });
  })

  conn.on('addSong', (songToAdd) => {
    if(songToAdd in songs) {
      conn.emit('song-added', {err: "Song already in queue"});
    } else {
      songs.push(songToAdd);    
      conn.emit('song-added', {confirmed: "Song added!"});
      io.emit('queue-updated', songs);
    }
  });

});


app.get('/api/searchMusic', (req, res) => {
  var q = req.query.q;
  SpotifyBackend.searchSongs(q).then(function(data) {
    res.send(data);
  })
  .catch((err) => {
    res.send({ err: err });
    console.log("error" + err);
  });
});

app.post('/api/addSong', (req, res) => {
  var songToAdd = req.body;
  console.log(songToAdd);
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

app.get('/api/getQueue', (req, res) => {
    res.send({
        "queue": songs
    });
});


// ----------- STATIC CONTENT --------------
app.use(express.static(path.join(currentDirectory, "picker")));
app.use('/jukeboxplayer', express.static(path.join(currentDirectory, 'playback')));

app.get("*", function(req, res) {
    res.status(404).send("File not found");
});

server.listen(app.get("port"), function() {
    console.log("Server started on port " + app.get("port"));
});
