//add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

//include moment for the date formatting of the concert
var moment = require("moment");
moment().subtract(10, 'days').calendar()

//Necessary requirements for the spotify queries
//Add the code required to import the keys.js file and store it in a variable.
var keys = require('./key.js'); //not currently working...
// access your Spotify keys information
var Spotify = require('node-spotify-api');
var mySpotify = new Spotify(keys.spotify);
//console.log(mySpotify.id);

//Necessary requirements for the file integration and axios call
var filesSystem = require("fs"); //included for the fourth command that utilizes the txt file
const axios = require('axios').default; //included for the movie query

//take in user input and store as variables for the queries
var command = process.argv[2]; //user input to decide on which command
var name = process.argv.slice(3).join(" "); //info to be queried

switch (command) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
};

//concert-this
function concertThis() {
    var artist = name;
    //search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    //axios call
    axios({
        method: "get",
        url: queryURL
    }).then(function (response) {
        // console.log(response);
        //render the venueName, venueLocation, & eventDate (use moment to format this as "MM/DD/YYYY") about each event to the terminal        
        console.log("Concerts for " + response.data[0].artist.name);
        console.log("------------------------------");

        for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[i].venue.name);
            console.log(response.data[i].venue.location);
            console.log(moment(response.data[i].datetime).subtract(10, 'days').calendar());
            console.log("------------------------------");
        } 
    }).catch(function(error) {
        console.log("Error: " + error);
    });
}; 

//spotify-this-song
function spotifyThis() {
    //You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API
    //ex command: node liri.js spotify-this-song '<song name here>'
    //If no song is provided then your program will default to "The Sign" by Ace of Base
    if (!name) {
        name = "The Sign";
    }
    mySpotify.search(
        {
            type: "track",
            query: name,
            limit: 5
    }, function(err, response) {
        if (err) {
            console.log("Error occurred: " + err);
        }
        //show the following information about the song in your terminal/bash window
        console.log("Searching for song")
        console.log("------------------------------");
        //artists
        console.log("Artist: " + response.tracks.items[0].artists[0].name);
        // //song name
        console.log("Song: " + response.tracks.items[0].name);
        // //preview link of the song from spotify
        console.log("Link: " + response.tracks.items[0].album.external_urls.spotify);
        // //album that the song is from
        console.log("Album: " + response.tracks.items[0].album.name);
        console.log("------------------------------");
        
    });
};
    
//movie-this
function movieThis() {
    //You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy
    //ex command line: node liri.js movie-this '<movie name here>'
    var movieName = name;
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios({
        method: "get",
        url: queryUrl
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
function doWhatItSays() {
    //ex command line: node liri.js do-what-it-says
    doIt();
    // use the txt to call one of LIRI's commands.
    switch (command) {
        case "movie-this":
            movieThis();
            break;
        case "concert-this":
            concertThis();
            break;
        case "spotify-this-song":
            spotifyThis();
            break;
    };
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
