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

//require moment package 
var moment = require("moment");

// require the Spotify node package and access the appropriate keys  
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// set command line variables 
var searchCommand = process.argv[2];
var searchQuery = process.argv.slice(3).join("+");

// variable for the search query to display in the console, along with results 
var searchQueryForPrint = process.argv.slice(3).join(" ");

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
    // check to see if the user input the name of an artist or band 
    if (searchQuery){
        // if the user did insert an actual search query, then run the axios request to the Bands in Town api
        axios.get("https://rest.bandsintown.com/artists/" + searchQuery + "/events?app_id=codingbootcamp")
        .then(function(response){
            console.log("Showing event results for " + searchQueryForPrint + ":");
            // check to see if there are any upcoming events 
            if (response.data.length > 0) {
                for (var i=0; i < response.data.length; i++){
                    var eventDate = moment(response.data[i].datetime, "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY");
                    console.log(
                        // * Name of the venue
                        // * Venue location
                        // * Date of the Event
                        "\nName of Venue: " + response.data[i].venue.name+
                        "\nVenue location: " + response.data[i].venue.city+ ", " + response.data[i].venue.country+ 
                        "\nEvent Date: " +eventDate+ 
                        "\n--------------------------------------------------------------"
                    )
                }
            }else{
                console.log("There are no upcoming events.")
            }
        });
    }else{
        axios.get("https://rest.bandsintown.com/artists/cardi+b/events?app_id=codingbootcamp")
        .then(function(response){
            // console.log(response);
            console.log("Showing event results for Cardi B: ") 
            for (var i=0; i < response.data.length; i++){
                var eventDate = moment(response.data[i].datetime, "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY");
                console.log(
                    // * Name of the venue
                    // * Venue location
                    // * Date of the Event
                    "\nName of Venue: " + response.data[i].venue.name+
                    "\nVenue location: " + response.data[i].venue.city+ ", " + response.data[i].venue.country+ 
                    "\nEvent Date: " +eventDate+ 
                    "\n--------------------------------------------------------------"
                )
            }
        });
    }
}

// NEW COMMAND: `spotify-this-song`
// `node liri.js spotify-this-song '<song name here>'`
function searchSpotify() {
    if (searchQuery){
        spotify.search({type: "track", query: searchQuery}, function(err,response){
            if (err){
                return console.log("An error occurred: " + err);
            }
            console.log("Here are your Spotify search results for " + searchQueryForPrint+ ":")
            for (var i = 0; i < response.tracks.items.length; i++){
                var artistArray = [];
                for (var j=0; j<response.tracks.items[i].artists.length; j++){
                    artistArray.push(response.tracks.items[i].artists[j].name);
                }
                var songName = response.tracks.items[i].name;
                var artistsNames =  artistArray.join(", ");
                var songLink = response.tracks.items[i].external_urls.spotify;
                var album = response.tracks.items[i].album.name;

                console.log('Song name: "'+songName+ '" \nArtist(s): ' + artistsNames +
                '\nAlbum: ' + album + '\nLink to the song on Spotify: ' + songLink+
                '\n\n-----------------------------------------------------------\n')
            }
        })
    }else{
        spotify.search({type: 'track', query: 'The Sign'}, function (err, response) {
            if (err) {
                return console.log("An error occurred: " + err);
            }
            var songName = response.tracks.items[5].name;
            var artistName = response.tracks.items[5].artists[0].name; 
            var songLink = response.tracks.items[5].external_urls.spotify;
            var album = response.tracks.items[5].album.name;

            console.log('Song name: "'+songName+ '" \nArtist(s): ' + artistName +
            '\nAlbum: ' + album + '\nLink to the song on Spotify: ' + songLink+
            '\n\n-----------------------------------------------------------\n');
        })
    }
}


//  NEW COMMAND: `movie-this`
// `node liri.js movie-this '<movie name here>'
function searchOMDB(){
    console.log("woo!");
    if (searchQuery){
        axios.get("http://www.omdbapi.com/?t=" + searchQuery + "&apikey=trilogy").then(function(response){
            // console.log(response.data);
            console.log("Title: " + response.data.Title + 
            "\nYear: " + response.data.Year+ 
            "\nIMDB Rating: " + response.data.Ratings[0].Value+
            "\nRotten Tomatoes Rating: " +response.data.Ratings[1].Value+
            "\nCountry: " +response.data.Country +
            "\nLanguage: " + response.data.Language +
            "\nPlot: " + response.data.Plot + 
            "\nActors: " + response.data.Actors);
        });

    }else{
        axios.get("http://www.omdbapi.com/?t=Mr.+Nobody&apikey=trilogy").then(function(response){
            // console.log(response.data);
            console.log("Title: " + response.data.Title + 
            "\nYear: " + response.data.Year+ 
            "\nIMDB Rating: " + response.data.Ratings[0].Value+
            "\nRotten Tomatoes Rating: " +response.data.Ratings[1].Value+
            "\nCountry: " +response.data.Country +
            "\nLanguage: " + response.data.Language +
            "\nPlot: " + response.data.Plot + 
            "\nActors: " + response.data.Actors);
        });
    };
}

// NEW COMMAND `do-what-it-says`
// `node liri.js do-what-it-says`
function searchRandomFile() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error)
        }
        // testing to log the data
        console.log(data);
        
        // create an array from the data read from the random file to separate the command from the actual search 
        var dataArray = data.split(",");

        console.log(dataArray);

        searchCommand = dataArray[0];
        searchQuery = dataArray[1];
        
        if (searchCommand === "movie-this"){
            if (searchQuery){
                axios.get("http://www.omdbapi.com/?t=" + searchQuery + "&apikey=trilogy").then(function(response){
                    console.log("Title: " + response.data.Title + 
                    "\nYear: " + response.data.Year+ 
                    "\nIMDB Rating: " + response.data.Ratings[0].Value+
                    "\nRotten Tomatoes Rating: " +response.data.Ratings[1].Value+
                    "\nCountry: " +response.data.Country +
                    "\nLanguage: " + response.data.Language +
                    "\nPlot: " + response.data.Plot + 
                    "\nActors: " + response.data.Actors);
                });
            };
        }

    });
}
//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.


