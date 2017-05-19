// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');
var seedData = require('./seedData.js');

var restaurants = seedData.restaurants;
var projects = seedData.projects;

//add all seed restaurants


//add all seed projects
module.exports = restaurants;
module.exports = projects;
