# LIRI Node App
A node app to search for songs on Spotify, music events on Bands in Town, and movies on OMDB

### Welcome to LIRI
Move over SIRI! LIRI (Language Interpretation and Recognition Interface) is a command line interface (CLI) app that runs on a user's terminal by using Node. LIRI allows users to search for songs on Spotify, music events on Bands in Town, and movies on OMDB by connecting to these different APIs. Once in their terminal window, users can enter the command line arguments to run node, the name of the LIRI app file (liri-app.js), followed by specific commands as well as specific search queries. Below, you will information about the specific commands that LIRI accepts. 

### Searching for Songs 
To search for songs on LIRI via the Spotify API, enter the following commands in your terminal: 

`node liri-app.js spotify-this-song <Your Search Query Here>`

This search will return all the relevant results for the name of the song you entered, including the song artists, the albums the song appears on, and a link to listen to the song on Spotify. 

If no search query is entered, as such: 

`node liri-app.js spotify-this-song`

The search will return the information for the default song "The Sign" by Ace of Base. 

### Searching for Music Events 
To search for upcoming tour events for your favorite artists or bands, enter the following commands in your terminal: 

`node liri-app.js concert-this <Your Search Query Here>`

If the artist/ band you entered has upcoming events, LIRI will return the names of the venue where the events will take place, the city in which the venues are located, as well as the dates of the upcoming events. Otherwise, LIRI will return that there are no upcoming events. 

If no search query is entered, as such: 

`node liri-app.js concert-this`

The search will return the upcoming events information for the default artist Cardi B. 

### Searching for Movies 
To search for movies on the Open Movie Database (OMDB), enter the following commands in your terminal: 

`node liri-app.js movie-this <Your Search Query Here>`

LIRI will return the title of the movie, the movie's release years, the IMDB and Rotten Tomatoes' ratings, the country where the movie was filmed, the languages in the movie, the movie's plot and the actors in the movie. 

If no search query is entered, as such: 

`node liri-app.js movie-this`

The search will return the information for the default movie "Mr. Nobody". 

### Searches Read From an External File 
LIRI is also able to read commands and search queries from an external file titled `random.txt`. To read and run commands from this file, enter the following commands:

`node liri-app.js do-what-it-says`

The `random.txt` file contains one of the above LIRI commands followed by a "," and a search query. LIRI separates the command from the search query and then runs accordingly. The default is set to search OMDB for details about the movie "Frozen". 


### About LIRI
LIRI runs on the user's terminal using Node software and also utilizes several different Node packages including:
- The File Systems package, to read from the `random.txt` file 
- Axios, to make API calls to the OMDB and Bands in Town APIs
- Spotify, to make API calls to Spotify 
- DotEnv, to export private Spotify keys to the `liri-app.js` file 

### Watch LIRI in Action 
Click on the link below to watch a video of LIRI in action: 
COMING SOON!

