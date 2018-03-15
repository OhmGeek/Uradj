var playbackIO = io();

$(function() {


    function getListItemForResult(song) {
        let item = document.createElement('li');
        item.className = "w3-bar";

        let thumbnail = document.createElement('img');
        thumbnail.src = song.info.thumbnail_img;
        thumbnail.className = "w3-bar-item w3-circle";
        thumbnail.setAttribute('style', 'width:85px');
        item.appendChild(thumbnail);

        let content = document.createElement('div');
        content.className = "w3-bar-item";

        let text = document.createElement('span');
        text.className = "w3-large"
        text.innerText = song.info.name;

        content.appendChild(text);
        item.appendChild(content);
        return item;
    }
    console.log("JQuery works");
    var players = plyr.setup('#spotify-player', {
        enabled: true,
        controls: ['play-large', 'volume', 'fullscreen']
    });
    playbackIO.emit('get-next-song');


    playbackIO.on('queue-updated', (songs) => {
        let queueList = document.querySelector('#up-next-list');
        queueList.innerHTML = "";
        let counter = 0;
        while (counter < 3 && counter < songs.length) {
            let song = songs[counter];
            let listItem = getListItemForResult(song);
            queueList.appendChild(listItem);
            counter += 1;
        }
    })



    playbackIO.on('play-next-song', (song) => {
        console.log(song);
        console.log(players);

        $('#song-title').text(song.info.name);

        players[0].source({
            type: 'video',
            title: song.info.name,
            sources: [{
                src: song.info.id,
                type: 'youtube'
            }],
            autoplay: true,
        });
        players[0].play();
    });

    players[0].on('ended', () => {
        playbackIO.emit('get-next-song');
    });
});