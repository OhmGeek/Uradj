var BASE_URL = window.location.origin;

URADJ.services = {
  queue: {
    getJSON: function() {
      // TODO: get queue from jukebox server
      return new Promise( (resolve, reject) => {
          axios.get(BASE_URL + "/api/getQueue").then((resp) => {
              if(resp.data) {
                resolve(resp.data);
              }
              else {
                  reject();
              }
          });
      });
    },
    add: function(songInfo) {
      // TODO: add item to queue.
      return new Promise( (resolve, reject) => {
        axios.post(BASE_URL + "/api/addSong", songInfo).then((resp) => {
          if(resp.data.info.err) {
            reject(resp.info.err);
          }
          else {
            resolve(resp);
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
