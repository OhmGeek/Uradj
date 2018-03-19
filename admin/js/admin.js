
$(function() {
    var adminIO = io();

    function getSongDOMObject(song) {
        // take the song representation and build a DOM object for the admin interface.
        // <li class="w3-display-container">
                 
        //         <span onclick="javascript:deleteSongFromQueue(this)" 
        //             class="w3-button w3-display-right">&times;</span>
                
        //     </li>
        let songObject = document.createElement('li');
        songObject.className = 'w3-display-container';
        songObject.dataset.song = JSON.stringify(song);
        let songText = document.createElement('span');
        songText.innerText = song.info.name;
        songObject.appendChild(songText);

        let deleteButton = document.createElement('span');
        deleteButton.className = "w3-button w3-display-right";
        deleteButton.innerHTML = "&times;";
        songObject.appendChild(deleteButton);
        songObject.addEventListener('click', function() {
            let song = JSON.parse(this.dataset.song);
            console.log("Delete");
            console.log(song)
            adminIO.emit('delete-song-from-queue', JSON.stringify(song));
        })
        return songObject;
    }

    adminIO.on('queue-updated', (songs) => {
        let queueList = document.querySelector('#up-next-list');
        queueList.innerHTML = "";
        songs.forEach( (song) => {
            let domObject = getSongDOMObject(song);
            queueList.appendChild(domObject);
        });
    });

    adminIO.emit('get-queue');
});


