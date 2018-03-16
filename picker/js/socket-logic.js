var socket = io();
// Display Search Results
socket.on('search-result', (results) => {
    let resultsList = document.querySelector('#search-result-list');
    resultsList.innerHTML = ""; // clear
    console.log(results);
    results.forEach((result) => {
        // Create a new list item. Add to this list item
        let listItem = getListItemForResult(result);
        addListenerToSongItem(listItem);
        resultsList.appendChild(listItem);
    });

});

// Update Queue
socket.on('queue-updated', (data) => {
        // First, update the UP NEXT LIST on home
    let queueList = document.querySelector('#up-next-list');
    queueList.innerHTML = "";
    let songs = data;
    console.log(songs);
    let counter = 0;
    while(counter < 3 && counter < songs.length) {
        let song = songs[counter];
        let listItem = getListItemForResult(song);
        queueList.appendChild(listItem);
        counter += 1;
    }

    // Then update the actual queue
    queueList = document.querySelector('#queue-list');
    queueList.innerHTML = "";
    console.log(songs);
    songs.forEach((song) => {
        let listItem = getListItemForResult(song);
        queueList.appendChild(listItem);
    });
})

// Confirm song added/error
socket.on('song-added', (data) => {
    if(data.confirmed) {
        swal({
            title: "Song added",
            type: "success"
        });
    } else {
        swal({
            title: "An error occurred",
            type: "error"
        });
    }
});

function search(elem) {
    var q = elem.value;
    console.log("search");
    socket.emit('search', {q: q});
}




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
    thumbnail_img.src = result.info.thumbnail_img;
  
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
  
    listItem.setAttribute('data-json', JSON.stringify(result));
  
    // now add the event trigger
    // finally return list item.
    return listItem;
  }
  
  function addListenerToSongItem(listItem) {
    listItem.addEventListener('click', (event) => {
      let target = event.currentTarget;
      let songData = JSON.parse(target.getAttribute('data-json'));
      socket.emit('addSong', songData);
    });
  }