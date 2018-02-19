var socket = io();
// Display Search Results
socket.on('search-results', (data) => {

    // First, update the UP NEXT LIST on home
    let queueList = document.querySelector('#up-next-list');
    let songs = data;
    console.log(songs);
    let counter = 0;
    while(counter < 3) {
        let song = songs[counter];
        let listItem = getListItemForResult(song);
        queueList.appendChild(listItem);
        counter += 1;
    }

    // Then update the actual queue
    queueList = document.querySelector('#queue-list');
    let songs = data;
    console.log(songs);
    songs.forEach((song) => {
        let listItem = getListItemForResult(song);
        queueList.appendChild(listItem);
    });
});

// Update Queue
socket.on('queue-updated', (data) => {
    
})

// Confirm song added/error
socket.on('song-added', (data) => {

});