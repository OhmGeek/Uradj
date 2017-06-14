/**
 * Created by ryan on 08/03/17.
   Modified by Mike Croall and Ryan Collins
 */
 var express = require('express');
 var ytSearch = require('youtube-search');
 var ytInfo = require('youtube-info');
 var bodyParser = require('body-parser');
 var path = require('path');
 var app = express();
 app.use(bodyParser.json()); // support json encoded bodies
 app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

 var songs = [];
 var currentDirectory = (process.env.PORT) ? process.cwd() : __dirname;

 app.set("port", process.env.PORT || 3000);

 app.use("/jquery", express.static(path.join(currentDirectory, "node_modules/jquery/dist")));
 app.use("/bootstrap", express.static(path.join(currentDirectory, "node_modules/bootstrap/dist")));
 app.use("/swal", express.static(path.join(currentDirectory, "node_modules/sweetalert/dist")));
 app.use("/jukeboxplayer", express.static(path.join(currentDirectory, "playback"))); // this serves the player
 app.use("/youtubeplayer", express.static(path.join(currentDirectory, "node_modules/jquery-tubeplayer-plugin/dist")));
app.use("/", express.static(path.join(currentDirectory, "picker"))); //this serves the song picker

 app.get("/api", function(req, res) {
     res.send("API example");
 });

 app.get("/api/searchMusic", function(req, res) {
     res.type("json");
     // now search youtube for music as defined.
     var q = req.query.q;

     // set the youtube search options, including API key
     const options = {
         maxResults: 10,
         key: "AIzaSyAztA71WPwAgYmkBKXidUBK-fzLipNd8VI"
     };

     // search youtube for the input
     ytSearch(q, options, function(err, results) {
         if (err) return console.log(err);
         res.send(results);
     });

 });

 app.post("/api/addSong", function(req, res) {
     res.setHeader('Content-Type', 'application/json');
     var id = req.body.id;
     var title = req.body.songtitle;

     if (id) {
         var index = -1;
         for (var i = 0; i < songs.length; i++) {
             if (songs[i].id === id) {
                 index = i;
                 break;
             }
         }
         if (index === -1) {
             songs.push({
                 id: id,
                 title: title
             }); // add the song to the id
             console.log("ADDED SONG - Songs array now:", songs);
             res.send({
                 "status": "Song with id " + id + " added to list"
             }); // confirm the song is added
         } else {
             console.log("Duplicate song attempted but denied");
             res.send({
                 err: "Song already queued"
             })
         }
     } else {
         res.send({
             err: "No id given"
         });
     }
 });

 app.post("/api/removeSong", function(req, res) {
     res.setHeader('Content-Type', 'application/json');
     var id = req.body.id;
     if (id) {
         var index = -1;
         for (var i = 0; i < songs.length; i++) {
             if (songs[i].id === id) {
                 index = i;
                 break;
             }
         }
         if (index !== -1) {
             songs.splice(index, 1); // remove the song to
             console.log("REMOVED SONG - Songs array now:", songs);
             res.send({
                 status: "Song removed from list",
                 queue: song
             }); // confirm the song is removed
         } else {
             res.send({
                 err: "Song not found in queue"
             })
         }
     } else {
         res.send({
             err: "No id given"
         });
     }
 });

 app.get("/api/getQueuedIds", function(req, res) {
     res.setHeader('Content-Type', 'application/json');
     res.send({
         queue: songs
     });
 });

 app.get("/api/getNextSong", function(req, res) {
     res.setHeader('Content-Type', 'application/json');
     if (songs.length > 0) {
         var id = songs[0].id;
         var title = songs[0].title;
         songs.splice(0, 1);
         console.log("Got song " + id + ", songs array now:", songs);
         res.send({
             "songID": id,
             "songName": title
         });
     } else {
         res.send({
             err: "Empty queue - no next song"
         });
     }
 });

 app.get("*", function(req, res) {
    res.send("404 - Sorry");
});

app.listen(app.get("port"), function() {
    console.log("Server started on port " + app.get("port"));
});
