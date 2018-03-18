var ytSearch = require('youtube-search');
var ytInfo = require('youtube-info');
module.exports = {
    addSongCheck: function(songToAdd) {
        return new Promise((resolve, reject) => {
            // Here, we check for duration less than 10 minutes.
            // filter by length
            console.log("REACHES ADD SONG CHECK");
            console.log(songToAdd);
            ytInfo(songToAdd.info.id, function (err, info) {

                if (info.duration < 600) {
                    resolve(songToAdd);
                }
                else {
                    reject("Song exceeds 10 minute limit");
                }
            });
        });
    },
    searchSongs: function(searchTerm) {
        // this takes a search term,
        // and returns a list of search results in
        // our format
        // set the youtube search options, including API key


        return new Promise(function(resolve, reject) {
            const options = {
                maxResults: 30,
                key: process.env.YT_API_KEY,
                type: 'video',
            };

            // search youtube for the input
            ytSearch(searchTerm, options, function(err, results) {
                if (err) return reject(err);

                // Now go through and filter data into format.
                let formattedResults = []
                results.forEach(result => {
                    var track = {
                        "backend": "youtube",
                        "info": {
                            "id": result.id,
                            "name": result.title,
                            "artist": "",
                            "length": "100",
                            "thumbnail_img": result.thumbnails.default.url,

                        }
                    }
                    formattedResults.push(track)
                });
                resolve(formattedResults);
            });
        });
    },
}