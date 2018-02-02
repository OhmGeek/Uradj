function getListItemForResult(result) {
  let listItem = document.createElement('ons-list-item');
  listItem.setAttribute("tappable");
  // first, add inside the image.

  // create the thumbnail stuff.
  let thumbnail = document.createElement('div');
  //
  thumbnail.className = "left";
  let thumbnail_img = document.createElement('img');
  thumbnail_img.className = "list-item__thumbnail";
  thumbnail_img.src = "http://placekitten.com/g/40/40"; //TODO: add thumbnail

  // Add the Thumbnail to the list item
  thumbnail.appendChild(thumbnail_img);

  // --- List item data ---
  let info = document.createElement('div');
  info.className = "center";
  // First the Song Name.
  let songNameUI = document.createElement('span');
  songNameUI.className = "list-item__title";
  songNameUI.appendChild(document.createTextNode(result.info.name));
  info.appendChild(songNameUI);

  // Then the artist name
  let artistNameUI = document.createElement('span');
  artistNameUI.className = "list-item__subtitle";
  artistNameUI.appendChild(document.createTextNode(result.info.artist));
  info.appendChild(artistNameUI);


  // Now add all items to the root list item
  listItem.appendChild(thumbnail);
  listItem.appendChild(info);

  listItem.setAttribute('data-json', JSON.stringify(result.info));

  // now add the event trigger
  listItem.addEventListener('click', (event) => {
    let target = event.target || event.srcElement;
    let songData = JSON.parse(target.getAttribute('data-json'));

    URADJ.services.queue.add(songData).then(() => {
      console.log("Added");
    })
    .catch((err) => {
      console.log("Error");
    });
  });
  // finally return list item.
  return listItem;
}

URADJ.controllers = {
  home: function(page) {
    console.log("Home");
    // TODO display what's hot, and cards for queue info.
  },
  viewQueue: function(page) {
    console.log("View Queue");
  },
  search: function(page) {

    let form = document.querySelector('#search-bar-form');
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      let query = document.querySelector('.search-input').value;

      // clear the search list.
      document.querySelector('#search-result-list').innerHTML = "";

      // then search for the search terms.
      URADJ.services.songs.search(query)
        .then((results) => {
          console.log(results);
          results.data.forEach((result) => {
            // Create a new list item. Add to this list item
            let listItem = getListItemForResult(result);
            document.querySelector('#search-result-list').appendChild(listItem);
    //         <ons-list-item>
    //   <div class="left">
    //     <img class="list-item__thumbnail" src="http://placekitten.com/g/40/40">
    //   </div>
    //   <div class="center">
    //     <span class="list-item__title">Cutest kitty</span><span class="list-item__subtitle">On the Internet</span>
    //   </div>
    // </ons-list-item>
          });
        })
        .catch((err) => {
          console.log("ERROR");
          console.log(err);
          document.querySelector("#search-result-list")
        });
      // finally, display items in the DOM.
    });
  }
};
