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
    // console.log(buttons);
    
    for (let index = 0; index < buttons.length; index++) {
        const element = buttons[index];
        var button = $("<button>").addClass("uk-button uk-button-default topic-btn");
        button.attr("data-topic", element);
        button.text(element);
        var buttonWrapper = $("<div>").append(button);

        buttonsWrapper.append(buttonWrapper);
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
            var gifImage = $("<img>").attr("src", element.images.fixed_height.url);
            var imageWrapper = $("<div>").addClass("uk-card-media-top").append(gifImage);
            var gifLabel = $("<p>").text(element.title);
            var labelWrapper = $("<div>").addClass("uk-card-body").append(gifLabel);
    
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
    $("#add-button").on("click", function(){
        var topicToAdd = $("#custom-topic").val();    
        buttons.push(topicToAdd);
        displayButtons();
    });

    $(document.body).on("click", ".topic-btn", function() {searchForTopic($(this).text());});
    
    $("#root").addClass("uk-container").append(buttonsWrapper, hr, gifsWrapper);
});