//add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

//Necessary requirements for the spotify queries
//Add the code required to import the keys.js file and store it in a variable.
var keys = require('./keys.js'); //not currently working...
// access your Spotify keys information
var Spotify = require('node-spotify-api');
var spotifySearch = new Spotify(keys.spotify);
console.log(spotifySearch.id);

//Necessary requirements for the file integration and axios call
var filesSystem = require("fs"); //included for the fourth command that utilizes the txt file
const axios = require('axios').default; //included for the movie query

//take in user input and store as variables for the queries
var command = process.argv[2]; //user input to decide on which command
var name = process.argv[3]; //info to be queried

var runCommands = function() {
    //concert-this
    if (command === "concert-this") {
        var artist = name;
        //search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist
        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        //axios call
        axios({
            method: "get",
            url: queryURL,
            responseType: "stream"
        }).then(function (response) {
        //render the venueName, venueLocation, & eventDate (use moment to format this as "MM/DD/YYYY") about each event to the terminal
            for (var i = 0; i < 3; i++) {
                console.log(response.venue.name);
                console.log(response.venue.location);
                console.log(response.datetime);
            }
        })
    }; 

    //spotify-this-song
    if (command === "spotify-this-song") {
        //You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API
        //ex command: node liri.js spotify-this-song '<song name here>'
        spotifySearch.search(
            {
                type: "track",
                query: name,
                limit: 5
        }, function(err, data) {
            if (err) {
                console.log("Error occurred: " + err);
            }
            //show the following information about the song in your terminal/bash window
            console.log(data);
            //artists
            JSON.stringify(data.tracks.items[0].artists[0].name);
            //song name
            JSON.stringify(data.tracks.items[0]);
            //preview link of the song from spotify
            JSON.stringify(data.tracks.items[0].external_urls[0].href);
            //album that the song is from
            JSON.stringify(data.tracks.items[0].name);
            //If no song is provided then your program will default to "The Sign" by Ace of Base
        });
    };
        
    //movie-this
    if (command === "movie-this") {
        //You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy
        //ex command line: node liri.js movie-this '<movie name here>'
        var movieName = name;
        // Then run a request with axios to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        axios({
            method: "get",
            url: queryUrl,
            responseType: "stream"
        }).then(function (response) {
        //output the folling info to the terminal/bash windo:
            // Title of the movie.
            console.log(response.data.Title);
            // Year the movie came out.
            console.log(response.data.Released);
            // IMDB Rating of the movie.
            console.log(response.data.imdbRating);
            // Rotten Tomatoes Rating of the movie.
            console.log(response.data.Ratings[1]);
            // Country where the movie was produced.
            console.log(response.data.Country);
            // Language of the movie.
            console.log(response.data.Language);
            // Plot of the movie.
            console.log(response.data.Plot);
            // Actors in the movie.
            console.log(response.data.Actors);
            //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
        });
    }

    //do-what-it-says
    if (command === "do-what-it-says") {
        //ex command line: node liri.js do-what-it-says
        doIt();
        // use the txt to call one of LIRI's commands.
        runCommands();
    }
}

//Using the fs Node package, LIRI will take the text inside of random.txt
function doIt() {
    // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
    // Edit the text in random.txt to test out the feature for movie-this and concert-this.
    filesSystem.readFile("random.txt", "utf8", function(err,data) {
        if (err) {
            console.log(err);
        } 
        output = data.split(", ");
        command = data[0];
        name = data[1];
        return command, name;
    }); 
} 
