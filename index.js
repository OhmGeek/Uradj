/**
 * Created by ryan on 08/03/17.
 */
const express = require('express');
const search = require('youtube-search');

// instances of objects
const app = express();

// defined constants for libraries
const opts = {
    maxResults: 10,
    key: 'AIzaSyAztA71WPwAgYmkBKXidUBK-fzLipNd8VI'
};

app.get('/search', function(req,res) {
   var q = req.query.q;

   var results = search(q, opts, function(err, results) {
        if(err) return console.log(err);
        console.log(q);
        return results;
    });
   console.log(results);
   res.send(results);
});



app.listen(3000);
console.log("Server started");