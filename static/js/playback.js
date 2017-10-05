/**
 * Created by ryan on 18/05/17.
 */
$(function() {


    var BASE_URL = location.origin;
    // todo load this from file rather than this monstrosity
    // this is the backup queue in case we have no more songs.

    var currentIndex = 0;
    $.getJSON("defaultPlaylist.json", function(BACKUP_PLAYLIST) {
        BACKUP_PLAYLIST = shuffleArray(BACKUP_PLAYLIST);

        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }

        function loadNextSong() {
            var url = BASE_URL + "/api/getNextSong";
            //Make an AJAX request to get the next song
            $.getJSON(url)
                .then(function(resp) {
                    console.log("GET NEXT SONG");
                    if (resp.songID) {
                        console.log("Next song ID:");
                        console.log(resp.songID);
                        $("#main-container").tubeplayer("play", resp.songID);
                        $("#nowplaying").text("Now playing: " + resp.songName);
                    } else {
                        console.log("play backup");
                        // otherwise, we need to go to our list of backup songs
                        var currentSong = BACKUP_PLAYLIST[currentIndex];
                        // play the song
                        $("#main-container").tubeplayer("play", currentSong.id);
                        $("#nowplaying").text("Now playing: " + currentSong.title); // TODO get song name from array
                        // increment the counter
                        currentIndex = (currentIndex + 1) % BACKUP_PLAYLIST.length;
                    }
                    // query API to get the entire queue
                    // /api/getQueuedIds/  GET request. resp.queue is the queue.
                    $.getJSON(location.origin + "/api/getQueuedIds")
                        .then(function(information) {
                            // console.log("GET JSON");
                            // console.log(information);
                            renderSongQueue(information.queue);
                        });
                    // get details of songs

                    // render the queue itself on jquery
                });
        }

        $("#main-container").tubeplayer({
            initialVideo: "go9D8_GWvh8",
            allowFullScreen: "false",
            controls: 1,
            annotations: false,
            onPlayerLoaded: function() {
                // console.log("Song loaded");
                $.getJSON(location.origin + "/api/getQueuedIds")
                    .then(function(information) {
                        // console.log("GET JSON");
                        // console.log(information);
                        renderSongQueue(information.queue);
                    });
            },
            onPlayerEnded: function() {
                // console.log("Song ended now");
                loadNextSong();
            },
            onErrorNotFound: function() {
                console.log("Error: video not found");
            },
            onErrorNotEmbeddable: function() {
                console.log("Error: video not embeddable");
            },
            onErrorInvalidParameter: function() {
                console.log("Error: invalid param")
            },
            onMute: function() {
                console.log("on mute called");
            }
        });



        function getQueue() {
            $.getJSON(location.origin + "/api/getQueuedIds")
                .then(function(information) {
                    // console.log("GET JSON");
                    // console.log(information);
                    renderSongQueue(information.queue);
                });
        }
        setInterval(getQueue, 10000);

        function renderSongQueue(songQueue) {

            // We go through the song queue, in order of ID.
            // for each:
            // render the item

            // <li class="list-group-item justify-content-between">
            //         SONG NAME
            //     <input type="button" class="btn btn-danger remove-song" value=" X ">
            //         </li>

            $('#queue-list').empty(); // empty the queue.

            songQueue.forEach(function(song) {
                // console.log("New Song", song);
                // for each, render an item
                //create the separator object
                var li = $("<li>");
                li.addClass("list-group-item justify-content-between");
                li.text(song.title);

                // Create the delete button
                var btnRemove = $("<button>");
                btnRemove.addClass("btn btn-danger remove-song");
                btnRemove.text("X");
                btnRemove.attr("type", "button");
                btnRemove.data("id", song.id); //store the song ID too.
                btnRemove.on("click", function() {
                    var id = $(this).data("id");

                    $.post(location.origin + '/api/removeSong', {
                            "id": id
                        }, null, 'json')
                        .then(function(data) {
                            if (data.err) {
                                swal("Oops...", "We couldn't delete the song.", "error");
                            } else {
                                renderSongQueue(data.queue);
                            }
                        });
                });

                li.append(btnRemove);
                $("#queue-list").append(li);
            });
        }
    });
});
