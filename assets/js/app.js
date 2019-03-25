// visual elements
var masthead = $("<a>").addClass("uk-logo uk-navbar-item").attr("href", "#");
var gifsWrapper = $("<div uk-grid>").addClass("uk-child-width-auto");
var buttonsWrapper = $("<div uk-grid>").addClass("uk-child-width-auto").attr("id", "buttons-wrapper");
var buttons = ["The Fairly OddParents", "Fairy Tail", "Legend of Zelda", "Assassination Classroom"];
var hr = $("<hr>");

// user defined variables
var searchTerm = "";
var searchLimit = 10;

// giphy API
var apiKey = "Ua4qc81wbz64Q3C9CJ2u4MhJIlRzhC7N";
var host = "https://api.giphy.com";
var searchPath = "/v1/gifs/search";
var apiParameter = "?api_key=" + apiKey;

function displayButtons() {
    buttonsWrapper.empty();
    
    for (let index = 0; index < buttons.length; index++) {
        const element = buttons[index];
        var button = $("<button>").addClass("uk-button uk-button-default topic-btn");
        button.attr("data-topic", element);
        button.text(element);
        var buttonWrapper = $("<div>").append(button);

        buttonsWrapper.append(buttonWrapper);
    }
}

function toggleAnimation(clickedGif) {    
    var gif = clickedGif;
        
    if (gif.attr("data-state") === "still") {
        gif.attr("src", gif.attr("data-animate"));        
        gif.attr("data-state", "animate");        
    } else {
        gif.attr("src", gif.attr("data-still"));
        gif.attr("data-state", "still");
    }
}

function searchForTopic(topicButton) {
    
    var searchText = topicButton.replace(/\s/g, "+");
    var searchTermParameter = "&q=" + searchText;
    searchLimit = $("#search-limit").val();
    var searchLimitParameter = "&limit=" + searchLimit;
    var searchURL = host + searchPath + apiParameter + searchTermParameter + searchLimitParameter;

    $.ajax({
        url: searchURL,
        method: "GET"   
    }).then(function(response) {
        var response = response.data;
        for (let index = 0; index < response.length; index++) {
            const element = response[index];
            // console.log(element);            
            var boringCard = $("<div>").css({'width': (element.images.fixed_height.width + 'px')});
            var gifCard = $("<div>").addClass("uk-card uk-card-default");
            var gifImage = $("<img>").attr("src", element.images.fixed_height_still.url);
            gifImage.addClass("gif");
            gifImage.attr("data-state", "still");
            gifImage.attr("data-still", element.images.fixed_height_still.url);
            gifImage.attr("data-animate", element.images.fixed_height.url);
            var imageWrapper = $("<div>").addClass("uk-card-media-top").append(gifImage);
            var gifLabel = $("<h3>").text(element.title).addClass("uk-card-title");
            var gifRating = $("<p>").text("Rated: " + element.rating);
            var labelWrapper = $("<div>").addClass("uk-card-body").append(gifLabel, gifRating);
    
            gifCard.append(imageWrapper, labelWrapper);
            boringCard.append(gifCard);
            gifsWrapper.prepend(boringCard);
        }
    });    
}

$(document).ready(function () {
    masthead.text("Hello, bb!");
    $("#navbar").prepend(masthead);
    displayButtons();

    $("#add").on("click", function() {
        var topicToAdd = $("#custom-topic").val();
        buttons.push(topicToAdd);
        $("#custom-topic").empty();
        displayButtons();
    });

    $("#custom-topic").keyup(function(event) {

        if (event.keyCode == 13) {
            var topicToAdd = $("#custom-topic").val();
            buttons.push(topicToAdd);
            $("#custom-topic").empty();
            displayButtons();
        }
    });

    $(document.body).on("click", ".topic-btn", function() {searchForTopic($(this).text());});
    $(document.body).on("click", ".gif", function() {
        toggleAnimation($(this));
    });
    
    $("#root").addClass("uk-container").append(buttonsWrapper, hr, gifsWrapper);
});