////////////////////////////////////////////////////////////
// GLOBAL VARIABLES 

// read and set all environment variables with the dotenv package 
require("dotenv").config();

// require the keys.js file, which is kept private
var keys = require("./keys.js");

// Require the fs package to read and write
var fs = require("fs");

// require Axios node package 
var axios = require("axios");

// require the Spotify node package and access the appropriate keys  
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// set command line variables 
var searchCommand = process.argv[2];
var searchQuery = process.argv[3];

// Switch function to determine which search will run, based on the 
switch(searchCommand){
    case "concert-this":
        searchBandsInTown();
        break;

    case "spotify-this-song":
        searchSpotify();
        break;

    case "movie-this":
        searchOMDB();
        break;
    
    case "do-what-it-says":
        searchRandomFile();
        break;

    default:
        console.log("LIRI cannot compute.")
};



// Use axios to grab data from OMDB API and the Bands in Town API 


/////////////////////////////////////////////////////////
// LIRI App Command Functions 

// function connected to the `concert-this`command 
// `node liri.js concert-this <artist/band name here>`
function searchBandsInTown(){
    console.log("Hey");
    // check to see if the user input the name of an artist or band 
    if (searchQuery){
        // if the user did insert an actual search query, then run the axios request to the Bands in Town api
        axios.get("https://rest.bandsintown.com/artists/" + searchQuery + "/events?app_id=codingbootcamp")
        .then(function(response){
            console.log(response);
        });
    }else{
        axios.get("https://rest.bandsintown.com/artists/rihanna/events?app_id=codingbootcamp")
        .then(function(response){
            console.log(response);
            // * Name of the venue

            // * Venue location

            // * Date of the Event (use moment to format this as "MM/DD/YYYY")
        });
    }
}


// * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

// * Name of the venue

// * Venue location

// * Date of the Event (use moment to format this as "MM/DD/YYYY")

// `spotify-this-song`
// 2. `node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window

//      * Artist(s)

//      * The song's name

//      * A preview link of the song from Spotify

//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.

//    * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.


//  `movie-this`
// `node liri.js movie-this '<movie name here>'
function searchOMDB(){
    console.log("woo!");
    if (searchQuery){
        axios.get("http://www.omdbapi.com/?t=" + searchQuery + "&apikey=trilogy").then(function(response){
            console.log(response);
        });

    }else{
        axios.get("http://www.omdbapi.com/?t=Mr.+Nobody&apikey=trilogy").then(function(response){
            console.log(response);
        });
    };
}

// axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
//   function(response) {
//     // Then we print out the imdbRating
//     console.log("The movie's rating is: " + response.data.imdbRating);
//   }
// );
//    * This will output the following information to your terminal/bash window:

//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

//      * It's on Netflix!

//    * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

//  `do-what-it-says`

// 4. `node liri.js do-what-it-says`

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.


