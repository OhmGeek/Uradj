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
var currentIndex = 0;
var default_queue = [
    {
      "backend": "youtube",
      "info": {
        "id": "XEjLoHdbVeE",
        "name": "Abba - Gimme! Gimme! Gimme! (A Man After Midnight)",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/XEjLoHdbVeE/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "unfzfe8f9NI",
        "name": "Abba - Mamma Mia",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/unfzfe8f9NI/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "WkL7Fkigfn8",
        "name": "Abba - Does Your Mother Know",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/WkL7Fkigfn8/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "pRpeEdMmmQ0",
        "name": "Shakira - Waka Waka (This Time for Africa) (The Official 2010 FIFA World Cup™ Song)",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/pRpeEdMmmQ0/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "a5_QV97eYqM",
        "name": "Simon & Garfunkel - Cecilia",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/a5_QV97eYqM/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "Z6VrKro8djw",
        "name": "Paul Simon - Me and Julio Down by the Schoolyard",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/Z6VrKro8djw/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "IuwxZSIS__4",
        "name": "Eddy Grant-Electric Avenue",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/IuwxZSIS__4/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "EaEPCsQ4608",
        "name": "MIKA - Grace Kelly (Extended Version)",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/EaEPCsQ4608/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "87gWaABqGYs",
        "name": "Ed Sheeran - Galway Girl [Official Video]",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/87gWaABqGYs/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "k2qgadSvNyU",
        "name": "Dua Lipa - New Rules (Official Music Video)",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/k2qgadSvNyU/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "Mgfe5tIwOj0",
        "name": "Dua Lipa - IDGAF (Official Music Video)",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/Mgfe5tIwOj0/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "yd8jh9QYfEs",
        "name": "Rihanna - Don't Stop The Music",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/yd8jh9QYfEs/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "PfYnvDL0Qcw",
        "name": "Lazy Town | We are Number One Music Video",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/PfYnvDL0Qcw/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "8xg3vE8Ie_E",
        "name": "Taylor Swift - Love Story",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/8xg3vE8Ie_E/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "Gs069dndIYk",
        "name": "Earth, Wind & Fire - September",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/Gs069dndIYk/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "Lrle0x_DHBM",
        "name": "Earth, Wind & Fire - Let's Groove",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/Lrle0x_DHBM/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "_eaIurlPB7w",
        "name": "Jax Jones - Yeah Yeah Yeah",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/_eaIurlPB7w/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "9k88fTGijLM",
        "name": "Neiked ft. Dyo - Sexual (Oliver Nelson Remix)",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/9k88fTGijLM/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "2vjPBrBU-TM",
        "name": "Sia - Chandelier (Official Video)",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/2vjPBrBU-TM/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "pIgZ7gMze7A",
        "name": "Wham! - Wake Me Up Before You Go-Go (Official Video)",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/pIgZ7gMze7A/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "LU2FgXST2Kw",
        "name": "Dexys Midnight Runners - Come On Eileen",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/LU2FgXST2Kw/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "dQw4w9WgXcQ",
        "name": "Rick Astley - Never Gonna Give You Up",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "7vWpMx51SB4",
        "name": "BACALL, MALO - Africa ft. Prince Osito",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/7vWpMx51SB4/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "fC_q9KPczAg",
        "name": "Barenaked Ladies - One Week (Video)",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/fC_q9KPczAg/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "eFjjO_lhf9c",
        "name": "Bryan Adams - Summer Of '69",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/eFjjO_lhf9c/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "DUT5rEU6pqM",
        "name": "Shakira - Hips Don't Lie ft. Wyclef Jean",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/DUT5rEU6pqM/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "weRHyjj34ZE",
        "name": "Shakira - Whenever, Wherever",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/weRHyjj34ZE/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "CHk5SWVO4p8",
        "name": "The 1975 - Chocolate",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/CHk5SWVO4p8/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "hXaU0QzByIM",
        "name": "The 1975 - UGH!",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/hXaU0QzByIM/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "y6120QOlsfU",
        "name": "Darude - Sandstorm",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/y6120QOlsfU/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "_ovdm2yX4MA",
        "name": "Avicii - Levels",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/_ovdm2yX4MA/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "71sqkgaUncI",
        "name": "Lucenzo And Don Omar Danza Kuduro",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/71sqkgaUncI/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "SSbBvKaM6sk",
        "name": "Blur - Song 2",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/SSbBvKaM6sk/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "w869Avr_fXI",
        "name": "Caesars Palace - Jerk It Out (Official Video)",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/w869Avr_fXI/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "jkaMiaRLgvY",
        "name": "The Kooks - Naive",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/jkaMiaRLgvY/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "JgRBkjgXHro",
        "name": "Ultra Nate - Free (Official Video)",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/JgRBkjgXHro/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "7ou6MoKmxFQ",
        "name": "Eric Prydz - Call On Me",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/7ou6MoKmxFQ/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "MQXLpSl26q4",
        "name": "Jax Jones - Instruction ft. Demi Lovato, Stefflon Don",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/MQXLpSl26q4/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "RYQi3fUJcrc",
        "name": "Nintendo Wii - Plaza Music (Bounce Mix)",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/RYQi3fUJcrc/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "HAiHEQblKeQ",
        "name": "Bellini - Samba De Janeiro",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/HAiHEQblKeQ/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "La4Dcd1aUcE",
        "name": "Nena ‎- 99 Luftballons",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/La4Dcd1aUcE/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "VHoT4N43jK8",
        "name": "Stromae - Alors On Danse",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/VHoT4N43jK8/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "EK_LN3XEcnw",
        "name": "Lou Bega - Mambo No. 5 (A Little Bit of...) (Official Video)",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/EK_LN3XEcnw/default.jpg"
      }
    },
    {
      "backend": "youtube",
      "info": {
        "id": "XfR9iY5y94s",
        "name": "Men At Work - Down Under (Video)",
        "artist": "ARTIST",
        "length": "100",
        "thumbnail_img": "https://i.ytimg.com/vi/XfR9iY5y94s/default.jpg"
      }
    }
  ];



// ------------- API calls ---------------
function songAlreadyQueued(song) {
  
  return new Promise((resolve, reject) => {
    let backend = song.backend;
    let id = song.info.id;
        songs.forEach((s) => {
            if (s.info.id == id && s.backend == backend) {
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
                conn.emit('search-result', { err: err });
            });
    })

    conn.on('addSong', (songToAdd) => {
        let checkPipeline = [
          songAlreadyQueued(songToAdd),
          YoutubeBackend.addSongCheck(songToAdd)
        ];
        
        Promise.all(checkPipeline).then((songToAdd) => {
            // add song.
            songs.push(songToAdd[0]);
            conn.emit('song-added', { confirmed: "Song added!" });
            io.emit('queue-updated', songs);
        }).catch((err) => {
            let msg = err || "Pick another song."
            conn.emit('song-added', { err: msg });
        });



        // songs.push(songToAdd);
        //     conn.emit('song-added', { confirmed: "Song added!" });
        //     io.emit('queue-updated', songs);
    });

    conn.on('get-queue', () => {
        // send the queue to those who need it.
        conn.emit('queue-updated', songs);
    });
    conn.on('get-next-song', () => {
        // We get the next song, broadcast it to everywhere else.
        let song = songs.shift();
        if (song) {
            io.emit('play-next-song', song);
        } else {
            let backup = default_queue[currentIndex];
            io.emit('play-next-song', backup);
            currentIndex = Math.round((currentIndex + 1) % default_queue.length);
        }
    });

    conn.on('delete-song-from-queue', (song) => {
        console.log("Song to delete:");
        console.log(song);
        song = JSON.parse(song)
        let indexToDelete = 0;
        while(songs.length > 0 && songs[indexToDelete].info.id != song.info.id) {
          indexToDelete += 1
        }

        if(songs[indexToDelete].info.id == song.info.id) {
          songs.splice(indexToDelete, 1);
          console.log("Deleted");
        } else {
          console.log("Couldn't delete")
        }


        conn.emit('queue-updated', songs);
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


    if (songToAdd in songs) {
        res.send({
            status: 200,
            info: {
                err: "Song already in the queue."
            }
        });
    } else {
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
app.use('/jukeboxmanager', express.static(path.join(currentDirectory, 'admin')));
app.get("*", function(req, res) {
    res.status(404).send("File not found");
});

server.listen(app.get("port"), function() {
    console.log("Server started on port " + app.get("port"));
});