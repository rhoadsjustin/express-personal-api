// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var projects = [
  {
    name: 'Tic-Tac-Toe Game',
    description: 'created a Tic-Tac-Toe game website with dummy AI',
    githubRepoUrl: 'https://github.com/rhoadsjustin/tic-tac-toe',
    deployedUrl: 'http://tictactoe-jr.bitballoon.com/',
    screenshot: 'public/images/tictactoescreenshot.png',
  },
  {
    name: 'JS Adventure game',
    description: 'created a JavaScript adventure game',
    githubRepoUrl: 'https://github.com/rhoadsjustin/js_adventure',
    deployedUrl: 'none',
    screenshot: 'public/images/jsadventurescreenshot.png',
  },
  {
    name: 'GeoQuakes',
    description: 'created a earthquake tracker by tapping into Google API and USGS earthquake API',
    githubRepoUrl: 'https://github.com/rhoadsjustin/geoquakes',
    deployedUrl: 'none',
    screenshot: 'public/images/geoquakesscreenshot.png',
  }
];
var restaurants = [
  {
    name: "Swift's Attic",
    description: "Stylish, retro-chic hot spot in historic space offering creative farm-to-table small plates, craft beer & cocktails.",
    address: '315 Congress Ave',
    rating: 8.5
  },
  {
    name: "Jack Allen's Kitchen",
    description: "Refined Southern-inspired flavors, crossed with the spice of southwestern cuisine.",
    address: '7720 Highway 71 West',
    rating: 7
  },
  {
    name: "Salty Sow",
    description: "the nation's newest head to tail restaurant serving local & sustainable ingredients in a modern farmhouse atmosphere.",
    address: '1917 Manor Road',
    rating: 9
  }
];

//add all seed restaurants
db.Restaurant.create(restaurants, function(err, restaurantsCreated){
    if (err){
      return console.log("Error:", err);
    }
    console.log("Added all Restaurants", restaurants);
    db.Project.create(projects, function(err, projectsCreated){
      if (err){
        return console.log("Error:", err);
      }

      console.log("Added all Projects", projects);
      process.exit(); // we're all done! Exit the program.
    });
  });

//add all seed projects
