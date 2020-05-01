//add code to read and set any environment variables with the dotenv package:
require("dotenv").config();
//Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys.js");
// access your keys information
var spotify = new Spotify(keys.spotify);

//commands to take in
    //concert-this
        //search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist
        //render the venueName, venueLocation, & eventDate (use moment to format this as "MM/DD/YYYY") about each event to the terminal
        //no need to sign up for a Bands in Town api_id key.
            //Use the "codingbootcamp" as your "app_id"
            //ex url: https://rest.bandsintown.com/artists/celine+dion/events?app_id=codingbootcamp
        
    //spotify-this-song
    //You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API
        //The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:
        // Step One: Visit https://developer.spotify.com/my-applications/#!/
        // Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
        // Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
        // Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.
        
        //ex command: node liri.js spotify-this-song '<song name here>'
        //show the following information about the song in your terminal/bash window
            //artists
            //song name
            //preview link of the song from spotify
            //album that the song is from
            //If no song is provided then your program will default to "The Sign" by Ace of Base

    //movie-this
        //You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy
        //ex command line: node liri.js movie-this '<movie name here>'
        //output the folling info to the terminal/bash windo:
            // Title of the movie.
            //   * Year the movie came out.
            //   * IMDB Rating of the movie.
            //   * Rotten Tomatoes Rating of the movie.
            //   * Country where the movie was produced.
            //   * Language of the movie.
            //   * Plot of the movie.
            //   * Actors in the movie.
            //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

    //do-what-it-says
        //ex command line: node liri.js do-what-it-says
        //Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
        // Edit the text in random.txt to test out the feature for movie-this and concert-this.

