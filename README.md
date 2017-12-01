# CheckItOut
This is web application which is part of Bachelor thesis.

## Bachelor thesis assignment
Create web application allowing users to register and maintain they have already seen movies and movies that they want to watch in future. The portal will be implemented in Node.js using Express framework and will run on public cloud. Frontend will be implemented in React.js. The portal will have following capabilities:
* It must have a friendly UI for both browsers and mobile devices
* It must allow users to register via social networks and plain username password
* Users can add in-app friends
* If user is connected to any social network, app will offer them their friends from this network, who are also using this app
* Users can manage their movie lists (add/remove movies from list and manage visibility – private, friends, public)
* Users can browse through their own movie lists, their friends list and also public lists
* Users can rate films, that they have already seen
* Application will contain smart search, that will search in friends list first and then it will use some public api (e.g [„the movie db“](https://www.themoviedb.org/documentation/api)) for searching new films that friends don’t know
* Search tab results will be similar to spotify (best results, movies, friends lists, public lists and maybe serials)
* Search bar results will be segmented – best results, movies, lists, …  (e.g using [Autosuggest component](http://react-autosuggest.js.org/))