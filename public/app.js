// fx: jQuery to display article input modal
$(".clickybutton").click(function() {

    // alert("YA CLICKED ME!!!");
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
        // With that done, add the note information to the page
        .then(function(data) {
            console.log(data);
            // The title of the article
            $("#notes").append("<h3>Notes for Article: <h3></h4><i>'" + data[0].title + "'</i></h4><br/>");
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' name='title' ><br/>");
            // A textarea toy add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea><br/>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data[0]._id + "' id='savenote' class='btn btn-block btn-dark'>Save Note</button>");

            // If there's a note in the article
            if (data[0].notetitle) {
                // Place the title of the note in the title input
                $("#titleinput").val(data[0].notetitle);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data[0].notebody);
            }
        });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from title input
                title: $("#titleinput").val(),
                notetitle: $("#titleinput").val(),
                // Value taken from note textarea
                body: $("#bodyinput").val(),
                notebody: $("#bodyinput").val()
            }
        })
        // With that done
        .then(function(data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});