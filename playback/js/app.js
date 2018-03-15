var playbackIO = io();

$(function() {
  console.log("JQuery works");
  var players = plyr.setup('#spotify-player', {
    enabled: true,
    controls: ['play-large', 'volume', 'fullscreen']
  });
  playbackIO.emit('get-next-song');

  playbackIO.on('play-next-song', (song) => {
    console.log(song);
    console.log(players);
    players[0].source({
      type: 'video',
      title: song.info.name,
      sources: [{
        src: song.info.id,
        type: 'youtube'
      }]
    });
  });
});
