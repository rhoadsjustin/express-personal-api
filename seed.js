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
]

db.Project.create(projects, function(err, projectsCreated){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Added all Projects", projects);
  process.exit(); // we're all done! Exit the program.
})
