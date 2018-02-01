var BASE_URL = window.location.origin;

URADJ.services = {
  queue: {
    getFullQueueAsJSON: function() {
      // TODO: get queue from jukebox server
      return new Promise( (resolve, reject) => {
        reject("Not implemented yet");
      });
    },
    add: function(songInfo) {
      // TODO: add item to queue.
      return new Promise( (resolve, reject) => {
        axios.post(BASE_URL + "/api/addSong", songInfo).then((resp) => {
          if(resp.info.err) {
            reject();
          }
          else {
            resolve();
          }
        });
      });
    },

  },
  songs: {
    search: function(searchTerm) {
      // TODO: search backend for a specific search term, returning results.
      return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/api/searchMusic", {
          params: {
            q: searchTerm
          }
        })
          .then((resp) => {
            resolve(resp);
          });
      });
    },
    getDetails: function(songID) {
      // TODO: get details about a songID.
    }
  }
};
