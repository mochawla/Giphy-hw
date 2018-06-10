var topics = ["Michael Jordan", "Kobe Bryant", "Hakeem Olajuwon", "Larry Bird",
"Magic Johnson", "Lebron James", "James Harden", "Stephen Curry", "Kyrie Irving"];


function requestGifs() {
    var nameSelected = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + nameSelected + "&api_key=UUlLpHyIAWvwc4LBPzAWOmIUrCiXfBmY&limit=10&rating=";
    $.ajax({
        url: queryURL,
        method: "GET"  
    })
    .then(function(response){
        console.log(response)
        for(var i = 0; i < response.data.length; i++) {
        var rating = $("<div>")
        rating.append("<p>Rating: " + response.data[i].rating + "</p>");
        var img = $("<img>")
        img.addClass("giphy-image")
        img.attr("src", response.data[i].images.fixed_height_still.url)
        console.log(response.data[i].images.fixed_height_still.url)
        img.attr("data-state", "still")
        img.attr("data-still", response.data[i].images.fixed_height_still.url)
        img.attr("data-animate", response.data[i].images.fixed_height.url)
        $("#gif-holder").append(rating);
        $("#gif-holder").append(img);      
        }
             
       $(".giphy-image").on("click", function(){
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }

       });



    });
    



}

function addButtons() {
    $("#button-holder").empty();
    for(var i=0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("player-giphy");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);

        $("#button-holder").append(button);
    }

    $(".player-giphy").on("click", function(){
		$("#gif-holder").empty();
	});





};  

$(document).ready(function() {

    addButtons();

    $("#player-submit").on("click", function(event) {
        event.preventDefault();  
    
        addButtons();
        
        var player = $("#player-input").val().trim();

        topics.push(player);
        
        
    })
  

    $(document).on("click", ".player-giphy", requestGifs);

   

});






















