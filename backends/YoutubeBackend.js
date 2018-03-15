var ytSearch = require('youtube-search');

module.exports = {
    searchSongs: function(searchTerm) {
      // this takes a search term,
      // and returns a list of search results in
      // our format
          // set the youtube search options, including API key
          console.log("YT SEARCH");


          return new Promise(function(resolve, reject) {
            const options = {
                maxResults: 30,
                key: process.env.YT_API_KEY
            };
            
            // search youtube for the input
            ytSearch(searchTerm, options, function (err, results) {
                console.log(results);
                console.log(err)
                if (err) return reject(err);
                let data = (results.filter((x) => x.kind === "youtube#video"));

                // Now go through and filter data into format.
                let formattedResults = []
                data.forEach(result => {
                   console.log(result); 
                   var track = {
                    "backend": "youtube",
                    "info": {
                      "id": result.id,
                      "name": result.title,
                      "artist": "ARTIST",
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