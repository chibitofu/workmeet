# workmeet
![workmeet_logo](http://i.imgur.com/jabq4b5.png)  
A Node.js app to help people find and catalogue places to work, meet or study.  
[Workmeet Heroku link](https://workmeet.herokuapp.com/)

 > "dependencies": {
    "bcrypt": "^0.8.5",
    "body-parser": "^1.14.1",
    "connect-flash": "^0.1.1",
    "dotenv": "^1.2.0",
    "ejs": "^2.3.4",
    "express": "^4.13.3",
    "express-ejs-layouts": "^2.0.0",
    "express-session": "^1.12.1",
    "geocoder": "^0.2.2",
    "pg": "^4.4.3",
    "pg-hstore": "^2.3.2",
    "request": "^2.67.0",
    "sequelize": "^3.14.2",
    "sequelize-cli": "^2.2.1"
  }
  
# Linked CDN libraries:
  * jQuery
  * jQuery UI
  * Bootstrap
  * Google Fonts  
    
  *You must have Node.js and nodemon installed on your computer.*  
    https://nodejs.org/en/ && https:///www.npmjs.com/package/nodemon  
  *requires Google Places API key.*  
    https://developers.google.com/places/web-service/  
  
# Installation:
1. In workmeet directory run $npm install  
  *This will install all the Node.js dependancies.*  
2. Use Postgres to create a new database by using the command $createdb workmeet  
3. Run the migration files through Sequelize with the command $Sequelize db:migrate  
  *This will create all the neccessary tables in the database.*  
4. Create a .env file in the workmeet directory. Input your Google Places API key in there: GOOGLE_PLACES_API_KEY=YOURKEY  
5. In the terminal start up nodemon using the command $nodemon  
  *This will start up the server on localhost:3000*  
6. In your web browser navigate to http://www.localhost:3000 to start using workmeet.  

# Usage:
  *You must be logged in to access any features other than searching Google Places.*  
- To search, either input a custom location or hit the target button to get your current location. ex. Space Needle, Seattle WA
- In the Search field enter in the type of establishment you would like to find. ex. coffee
- To add a favorite, click on the favorite button in the search results.
- When adding a favortie you can input additional tags and set certain options.
  *Settings for wifi, seating, outlets and noise are averaged out between all users who have favorited that location.*  
- To edit a favorite, in the Favorites window, expand the favorite by clicking on the header. Then click on the edit button.
- You can reorganize favorites by dragging and dropping, while in the Favorites window.

