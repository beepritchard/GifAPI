// create movies array

var topics = ["The Proposal", "The Hitman Bodyguard", "Sweethome Alabama", "Cast Away", "Ant man", "Star Trek into the Darkness"];

// create function for button to loop in the movies array

function moviebtn () {

    $("#moviebtn").empty ();

    for (var i = 0; i < topics.length; i++) {
        var mvbtn = $("<button>");
        mvbtn.addClass("movie btn btn-info m-1");       
        mvbtn.attr("data-name", topics[i]);      
        mvbtn.text(topics[i]);     
        $("#moviebtn").append(mvbtn);
    }
}
 // create function for gifAPI
  
 function Gif() {

    var apiKey = "pBCiMA0hOvwfBfkrlgMInjdcKH75FL2N"
    var movieButton = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + movieButton + "&limit=10&offset=0&rating=G&lang=en";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log (response);

        var Row = $("<div class='row m-2 p-1 border border-dark rounded'>");
        var imageDiv = $("<div class='col'>");
        

        for (var i = 0; i < response.data.length; i++) {

            var image = $("<img class='figure-img img-fluid rounded gif'>");
            var imageURL = response.data[i].images.fixed_height_small_still.url;
            var imageTitle = $("<figcaption class='figure-caption text-dark'>" + "Rating: " 
                                + (response.data[i].rating).toUpperCase () + "</figcaption>");
            var Figure = $("<figure class='figure m-1'>");

            image.attr("src", imageURL);
            image.attr("data-state", "still");
            image.attr("data-still", response.data[i].images.fixed_height_small_still.url);
            image.attr("data-animate", response.data[i].images.fixed_height_small.url);
            Figure.append(image, imageTitle);
            imageDiv.append(Figure);
            
        }
            
        Row.append(imageDiv);
        $("#moviegif").prepend(Row);

    });
  }

$("#submit").on("click", function(event) {
  console.log (event);
    event.preventDefault();
    var movieEnter = $("#movieEnter").val().trim();
    topics.push(movieEnter);
    moviebtn();
    $("#movieEnter").val('');

});

moviebtn ();

$(document).on("click", ".movie", Gif);

$(document).on("click", ".gif", function() {

    var state = $(this).attr("data-state");
 
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});