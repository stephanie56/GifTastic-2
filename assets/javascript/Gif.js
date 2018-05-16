
$(document).ready(function() {

 //the array

    var topics =['Phantom of the Opera','Sound of Music','Cats','West Side Story','Les Miserables', 'Chicago', 'Mamma Mia'];

// create buttons of the array
    function makeButton() {
      $("#buttonContainer").empty();
            for (var i = 0; i < topics.length; i++) {
                      var btn = $("<button>").attr("data-musicals", topics[i]).text(topics[i]);
                      $("#buttonContainer").append(btn);
                }
    }

    window.onload = makeButton();


	$("btn").on("click", function() {      //empty previous gifs upon next button selection
		$(".gifs").unbind("click");
		$("#gifsContainer").empty();

	});

// Add click event to buttons

    $("#buttonContainer").on("click", "button", function() {
            var musicals = $(this).attr("data-musicals");//Grab, store data-musicals value from button
            console.log(this);
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + musicals + "&api_key=dCPyXBjQ4KldTQPiQVC71Y6ChRyzgKxT&limit=10";// Construct queryURL, use musical name

            $.ajax({
                url: queryURL,     // Perform an AJAX request with the queryURL
                method: "GET"
            })

            .then(function(response) {                   // when data comes back from the request
                console.log(queryURL);

                console.log(response);

            var results = response.data;// storing the data from the AJAX request in the results variable
                for (var i = 0; i < results.length; i++) {     // Loop through each result item
                        var musicalsDiv = $("<div>");          // Create, store a div tag
                        var p = $("<p>").text("Rating: " + results[i].rating);   // Create p tag with result item's rating
                        var musicalsImage = $('<img src="'+results[i].images.fixed_height.url+'" >');
                          // Create, store image tag
            // Setting the src attribute of the image to a property pulled off the result item
                        musicalsImage.attr("src", results[i].images.fixed_height.url);
                        musicalsImage.attr('data-still', results[i].images.fixed_height_still.url);
                        musicalsImage.attr('data-animate', results[i].images.fixed_height.url);
                        musicalsImage.attr('data-state', results[i].images.fixed_height_still.url);


                        musicalsDiv.append(p);
                        musicalsDiv.append(musicalsImage);  // Append p and img tag to musicalsDiv
                        $(musicalsImage).addClass("gifs"); //add class to musical images

                        $("#gifsContainer").prepend(musicalsDiv);  // Prepend musicalsDiv to HTML page in "#gifsContainer" div

                        $('.gifs').on('click', function() {


                            var state = $(this).attr('data-state');

                            if (state == 'still') {
                                $(this).attr('src', $(this).data('animate'));
                                $(this).attr('data-state', 'animate');
                            } else {
                                $(this).attr('src', $(this).data('still'));
                                $(this).attr('data-state', 'still');
                            }

                        });
          }

        });

    });

    //submit new musical button by user choice

            //$("form").submit();
        $("#submit").on("click", function(event) {
          event.preventDefault();
                       var userInput = $("#userChoice").val().trim();
                       console.log($("#userChoice"));
                       topics.push(userInput);
                       makeButton();
                       return false;



        });





});
