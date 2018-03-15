var express = require('express');
var bodyParser = require('body-parser');
// var SpotifyBackend = require('./backends/SpotifyBackend.js');
var YoutubeBackend = require('./backends/YoutubeBackend.js');
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
function songAlreadyQueued(song) {
  let backend = song.backend;
  let id=song.info.id;

  return new Promise((resolve, reject) => {
    songs.forEach((s) => {
      if(s.info.id == id && s.backend==backend) {
        reject("Song Already In Queue");
      }
    });
    resolve(song);
  })
}
io.on('connection', function(conn) {
  conn.on('search', (query) => {
    var q = query.q;
    YoutubeBackend.searchSongs(q).then(function(data) {
      conn.emit('search-result', data);
    })
    .catch((err) => {
      conn.emit('search-result', {err: err});
    });
  })

  conn.on('addSong', (songToAdd) => {
    songAlreadyQueued(songToAdd).then((song) => {
      songs.push(songToAdd);    
      conn.emit('song-added', {confirmed: "Song added!"});
      io.emit('queue-updated', songs);
    }).catch((err) => {
      conn.emit('song-added', {err: "Song already in queue"});
    });
  });

  conn.on('get-next-song', () => {
    // We get the next song, broadcast it to everywhere else.
    let song = songs.shift();
    let backup = {
      backend: 'youtube',
      info: {
        id: 'IwzUs1IMdyQ',
        title: 'vitas',
      }
    }
    if(song) {
      io.emit('play-next-song', song);
    } else {
      io.emit('play-next-song', backup)
    }
  });

});


app.get('/api/searchMusic', (req, res) => {
  var q = req.query.q;
  YoutubeBackend.searchSongs(q).then(function(data) {
    res.send(data);
  })
  .catch((err) => {
    res.send({ err: err });
    console.log("error" + err);
  });
});

app.post('/api/addSong', (req, res) => {
  var songToAdd = req.body;
  songs.push(songToAdd);


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
