/**
 * Created by ryan on 18/05/17.
 */
$(function() {


    var BASE_URL = location.origin;

    // todo load this from file rather than this monstrosity
    // this is the backup queue in case we have no more songs.
    var currentIndex = 0;
    var BACKUP_PLAYLIST = [
      "weeI1G46q0o",
      "JGwWNGJdvx8",
      "t5p5uCgY-tY",
      "0zGcUoRlhmw",
      "HHCC4ndeJyE",
      "Io0fBr1XBUA",
      "e3Qu5C0pcGA",
      "SPc-oWXEhQQ",
      "9Ke4480MicU",
      "rhcc1KQlCS4",
      "I4IXxzioDAk",
      "ginBV6aeVlc",
      "8j9zMok6two",
      "87gWaABqGYs",
      "-pAWXbMB3aM",
      "euCqAq6BRa4",
      "nBmNcLBaPUE",
      "f6tU6BfnWEI",
      "72UO0v5ESUo",
      "6mTqqloMDjI",
      "heeqMP_wwFw",
      "5GL9JoH4Sws",
      "gBAfejjUQoA",
      "DBcVPsTmG5I",
      "ubtbkgUmHHE",
      "PMivT7MJ41M",
      "9ORWF5RkdO0",
      "I-VsisgVkHw",
      "uy3KFOykGQc",
      "nfs8NYg7yQM",
      "-cy78b9uvBs",
      "t3ZNK0Tewqs",
      "FG9M0aEpJGE",
      "yWEK4v9AVKQ",
      "qN4ooNx77u0",
      "A7xzXDStQnk",
      "papuvlVeZg8",
      "fRNkQH4DVg8",
      "VbfpW0pbvaU",
      "qXiuVQ-GgA4",
      "fS7OffmLrf0",
      "5hzB9qQENGA",
      "AEB6ibtdPZc",
      "DpMfP6qUSBo",
      "EwzD8U4u76k",
      "NGLxoKOvzu4",
      "dMK_npDG12Q",
      "ozEI3dEV95w",
      "fKopy74weus",
      "MH9ilfAZHOs",
      "m9vO5pk4Ytg",
      "w6DukrYK5wQ",
      "QYfS6rgGV_E",
      "Y-I45CgjX0o",
      "AY9blLYMKnI",
      "RhkgEgPqGc4",
      "u3VTKvdAuIY",
      "J7it_g_gAY4",
      "oHmBf4ExtZk",
      "zeH1fUsakTA",
      "r3RXHOTMmLw",
      "e2vBLd5Egnk",
      "aatr_2MstrI",
      "domR-DLjsrc",
      "cHOrHGpL4u0",
      "FM7MFYoylVs",
      "BpIvh3gXAOg",
      "BKpJqz2OlqA",
      "7wtfhZwyrcc",
      "WH9C6oLEtOg",
      "rr2fPpwh6CI",
      "UprcpdwuwCg",
      "vdI0JLVhdYc",
      "K4ZeDuKF4m8",
      "kzQTc0-iBX8",
      "34WHRrEwUws",
      "DKJIgOSlDKk",
      "by3yRdlQvzs",
      "5-xVwxqjNyI",
      "4is83n8xfLY",
      "wZEmFDj8ml0",
      "5dmQ3QWpy1Q",
      "2JzttfbZWpQ",
      "_uSHnm3t1og",
      "phr1pOFK1V8",
      "en2D_5TzXCA",
      "K0ibBPhiaG0",
      "Um7pMggPnug",
      "XatXy6ZhKZw",
      "kOkQ4T5WO9E",
      "xO0Tt7NLC1Q",
      "lY2yjAdbvdQ",
      "Ey_hgKCCYU4",
      "LKroRc-gZVA",
      "hRVfCplkKq4",
      "PcJ0r06ldYE",
      "BqaoAQbkeXo",
      "YnwsMEabmSo",
      "ZNra8eK0K6k",
      "WXmTEyq5nXc",
      "CQGcfudKBBs",
      "BV5nuF5lFU8",
      "IT_c3fFW3VM",
      "1VUa99-tJqs",
      "SYGZVJo60Do",
      "AXnqkVTFUqY",
      "HHP5MKgK0o8",
      "SC4xMk98Pdc",
      "DM5tJ7q9rYk",
      "34Na4j8AVgA",
      "jsbeemdD2rQ",
      "4ynV49NzGxw",
      "wuCK-oiE3rM",
      "RnBT9uUYb1w",
      "S0qrinhNnOM",
      "KkGVmN68ByU",
      "uAVUl0cAKpo",
      "rTCwL0Wsvyw",
      "Y2V6yjjPbX0",
      "SXiSVQZLje8",
      "-rey3m8SWQI",
      "DTWAavrVNQA",
      "RJOqJ-RitOg",
      "KEI4qSrkPAs",
      "AEHj_OyKY1Y",
      "ftG3NTqWzAk",
      "S-sJp1FfG7Q",
      "2AslJmdhSro",
      "QpbQ4I3Eidg",
      "fKas4dzDzcs",
      "3LzWUAkpNrQ",
      "31crA53Dgu0",
      "TWJcg5owc0g",
      "AQ4MQ_uhBSs",
      "_DWI7iJaXhk",
      "NPQiakiLGx4",
      "1-xGerv5FOk",
      "ACPd7HSZkc0",
      "0GoGcVs6pbU",
      "9bzMaiczpXU",
      "IdneKLhsWOQ",
      "3j8ecF8Wt4E",
      "DVkkYlQNmbc",
      "d2UZlwTDGbY",
      "K44j-sb1SRY",
      "7mWQ38SpEf8",
      "TXRCGKFCH-0",
      "OM33anTtEVE",
      "ANS9sSJA9Yc",
      "b8m9zhNAgKs",
      "a2v_zGWawP0",
      "UqyT8IEBkvY",
      "1Vn1BXfsd4Q",
      "b4Bj7Zb-YD4",
      "v6IAJOOmDMg",
      "GKSRyLdjsPA",
      "JVpTp8IHdEg",
      "NmCFY1oYDeM",
      "xwjwCFZpdns",
      "sY3rIlrTTh8",
      "k9elZm_EH_4",
      "bFDzhKdrN9M",
      "IC-bSbXZBcU",
      "R7xbhKIiw4Y",
      "BXQ6QNLcJL8",
      "VEou0QBeHlk",
      "2RRY3OVqtwc",
      "m1g4SpPGUBU",
      "3AtDnEC4zak",
      "MWASeaYuHZo",
      "YqeW9_5kURI",
      "nBtDsQ4fhXY",
      "k1gsZ-OsGpI",
      "XsFneCExrCQ",
      "eC-F_VZ2T1c",
      "iTno21crSsY",
      "QGJuMBdaqIw",
      "-59jGD4WrmE",
      "1ekZEVeXwek",
      "Xn599R0ZBwg",
      "i_kF4zLNKio",
      "lWA2pjMjpBs",
      "7PCkvCPvDXk",
      "Pw-0pbY9JeU",
      "qDRORgoZxZU",
      "xUVz4nRmxn4",
      "WUcXQ--yGWQ",
      "YUYjxf9rHCY",
      "S2oxFIsENgM",
      "UrUJyKsLQeU",
      "5JxgDJvqGmM",
      "foE1mO2yM04",
      "tD4HCZe-tew",
      "sy0279ZjVEo",
      "rYEDA3JcQqw",
      "C_3d6GntKbk",
      "rClUOdS5Zyw",
      "Jca0B2lbqpU",
      "ru0K8uYEZWw",
      "MoHnffhBwqs",
      "9WbCfHutDSE",
      "oydff0QlXSM",
      "sO9cBXRcBvo",
      "4KfnU1VI9SE",
      "cMTAUr3Nm6I",
      "E5ONTXHS2mM",
      "0KSOMA3QBU0",
      "IvPT2QuCIOA",
      "9h30Bx4Klxg",
      "GTyN-DB_v5M",
      "XgJFqVvb2Ws",
      "uO59tfQ2TbA",
      "kSdcVt6eVfA",
      "YBHQbu5rbdQ",
      "OXWrjWDQh7Q",
      "OORoOGY8D2M",
      "5yXQJBU8A28",
      "e7eZUGB9HKU",
      "De30ET0dQpQ",
      "z9porfO8C_Q",
      "IdymkbLAuAk",
      "DK_0jXPuIr0",
      "liwCttfeJ7E",
      "Ho32Oh6b4jc",
      "2vjPBrBU-TM",
      "iS1g8G_njx8",
      "DXKHCgNFk1I",
      "jGflUbPQfW8",
      "QcIy9NiNbmo",
      "OPf0YbXqDm0",
      "zeT_nYtjgTQ",
      "0HDdjwpPM3Y",
      "b_KfnGBtVeA",
      "NUsoVlDFqZg",
      "t4H_Zoh7G5A",
      "Bznxx12Ptl0",
      "F57P9C4SAW4",
      "nntGTK2Fhb0",
      "1WpoKRnoPRU",
      "w2CELiObPeQ"
    ];

    function loadNextSong() {
      var url = BASE_URL + "/api/getNextSong";
      //Make an AJAX request to get the next song
      $.getJSON(url)
          .then(function(resp) {
              console.log("GET NEXT SONG");
              if(resp.songID) {
                  console.log(resp);
                $("#main-container").tubeplayer("play", resp.songID);
              } else {
                  console.log("play backup");
                // otherwise, we need to go to our list of backup songs
                var songID = BACKUP_PLAYLIST[currentIndex];
                // play the song
                $("#main-container").tubeplayer("play", songID);
                // increment the counter
                currentIndex = (currentIndex + 1) % BACKUP_PLAYLIST.length;
              }
              // query API to get the entire queue
              // /api/getQueuedIds/  GET request. resp.queue is the queue.
                $.getJSON(location.origin + "/api/getQueuedIds")
                    .then(function(information) {
                        console.log("GET JSON");
                        console.log(information);
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
        onPlayerLoaded: function(){
            console.log("Song loaded");
        },
        onPlayerEnded: function() {
          console.log("Song ended now");
          loadNextSong();
        },
        onErrorNotFound: loadNextSong(),
        onErrorNotEmbeddable: loadNextSong(),
        onErrorInvalidParameter: loadNextSong(),
        onMute: loadNextSong()
    });


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
            console.log("New Song");
            console.log(song);
            // for each, render an item
            //create the separator object
            var li = $('<li>');
            li.addClass('list-group-item');
            li.addClass('justify-content-between');
            li.val(song.title);

            // Create the delete button
            var btnRemove = $('<input>');
            btnRemove.addClass('btn btn-danger remove-song');
            btnRemove.val(" X ");
            btnRemove.data('id', song.id); //store the song ID too.
            // todo add a remove item event.

            li.append(btnRemove);

        });
    }


});
