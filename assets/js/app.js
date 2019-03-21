// visual elements
var masthead = $("<h1>").addClass("uk-text-center");
var gifsWrapper = $("<div uk-grid>").addClass("uk-child-width-auto");

// user defined variables
var searchTerm = "fairy+tail";
var searchLimit = 5;

// giphy API
var apiKey = "Ua4qc81wbz64Q3C9CJ2u4MhJIlRzhC7N";
var host = "https://api.giphy.com";
var searchPath = "/v1/gifs/search";
var apiParameter = "?api_key=" + apiKey;
var searchTermParameter = "&q=" + searchTerm;
var searchLimitParameter = "&limit=" + searchLimit;

var searchURL = host + searchPath + apiParameter + searchTermParameter + searchLimitParameter;


$.ajax({
    url: searchURL,
    method: "GET"   
}).then(function(response) {
    var response = response.data;
    for (let index = 0; index < response.length; index++) {
        const element = response[index];
        var boringCard = $("<div>");
        var gifCard = $("<div>").addClass("uk-card uk-card-default");
        var gifImage = $("<img>").attr("src", element.images.fixed_height.url);
        var imageWrapper = $("<div>").addClass("uk-card-media-top").append(gifImage);
        var gifLabel = $("<p>").text(element.title);
        var labelWrapper = $("<div>").addClass("uk-card-body").append(gifLabel);

        gifCard.append(imageWrapper, labelWrapper);
        boringCard.append(gifCard);
        gifsWrapper.append(boringCard);
        
    }
    
});

$(document).ready(function () {
    masthead.text("Hello, bb!")
    $("#root").addClass("uk-container").append(masthead, gifsWrapper);
});