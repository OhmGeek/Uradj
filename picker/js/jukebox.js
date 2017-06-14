/**
 * Client side script for the jukebox system
 * Created by Ryan on 30/04/17.
 * Rewritten to less hacky standards by Mike on 19/05/17. ;)
 *
 */
$(function() {
    var BASE_URL = location.origin;

    // Search on enter without refreshing
    $('#music-search-box').on('keyup keypress', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            // DON'T SUBMIT FORM
            e.preventDefault();

            // Perform search
            var searchTerm = $(this).val();
            var url = BASE_URL + "/api/searchMusic";
            // now GET JSON of the search results
            $.getJSON(url, {
                q: searchTerm
            }).done(function(results) {
                // clear the cong container
                $('#song-container').empty();
                // iterate through search results
                results.forEach(renderItem);
            });

            return false;
        }
    });

    var renderItem = function(item) {
        var li = $("<div>");
        li.addClass("card media");
        li.data("songid", item.id);
        li.data("itemtitle", item.title);
        li.click(function() {
            $.post(BASE_URL + "/api/addSong", {
                id: $(this).data("songid"),
                songtitle: $(this).data("itemtitle")
            }, function(resp) {
                // console.log(resp);
                if (resp.err && resp.err === "Song already queued") {
                    swal({
                        title: "Oops...",
                        text: "This song is already queued up!",
                        type: "error",
                        timer: 2000
                    });
                } else {
                    swal({
                        title: "Success",
                        text: "We've added your song to the queue!",
                        type: "success",
                        timer: 2000
                    });
                }
            }, 'json');
        });

        var a = $("<a>");
        a.addClass("navigate-right");

        var thumbnailImg = $("<img>");
        thumbnailImg.addClass("cardimg pull-left");
        thumbnailImg.attr("src", item.thumbnails.high.url);

        var titleDiv = $("<h4>");
        titleDiv.addClass("media-body");
        titleDiv.text(item.title);

        var descriptionP = $("<p>");

        descriptionP.text(item.description);

        titleDiv.append(descriptionP);
        a.append(thumbnailImg);
        a.append(titleDiv);
        li.append(a);
        $('#song-container').append(li); // add item to DOM
    };
});
