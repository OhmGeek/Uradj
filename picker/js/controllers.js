URADJ.controllers = {
  home: function(page) {
    console.log("Home");

    let form = document.querySelector('#search-bar-form');
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      let query = document.querySelector('.search-input').value;
      // then search for the search terms.
      URADJ.services.songs.search(query)
        .then((results) => {
          console.log(results);
        });
      // finally, display items in the DOM.

    });

  },
  viewQueue: function(page) {
    console.log("View Queue");
  },
  search: function(page) {
    console.log("Search");
  }
};
