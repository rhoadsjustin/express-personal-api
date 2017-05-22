// require express and other modules
var express = require('express'),
app = express(),
seedData = require('./seedData.js');
// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
* DATABASE *
************/

var db = require('./models');

/**********
* ROUTES *
**********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
* HTML Endpoints
*/

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
* JSON API Endpoints
*/

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  res.json({
    IRemeberedToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/rhoadsjustin/express-personal-api/README.md", // CHANGE ME
    baseUrl: "http://glacial-brushlands-72768.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "GET", path: "/api/restaurants", description: "Get my favorite reastaurants"},
      {method: "GET", path: "/api/projects", description: "Get my current projects"},// CHANGE ME
      {method: "POST", path: "/api/restaurants", description: "Add a new favorite restaurant"},
      {method: "GET", path: 'api/restaurants/:rating', description: 'Get restaurants by rating'}
    ]
  })
});
//get the hardcoded profile
app.get('/api/profile', function(req, res){
  var profile = {
    name: 'Justin Rhoads',
    githubUsername: 'rhoadsjustin',
    githubProfileImage: 'https://avatars3.githubusercontent.com/u/26558860?v=3&u=be873be42d6bd7ea2af15179adffa4f0ddee15e4&s=400',
    personalSiteLink: 'rhoadsjustin.github.io',
    currentCity: 'Austin, TX',
    favoriteSportsTeams: [{name: 'Los Angelas Lakers', sport: 'basketball'}, {name: 'Arkansas Razorbacks', sport: 'football and basketball'}]
  };
  res.json(profile);
});
//get all projects
app.get('/api/projects', function(req, res){
  db.Project.find({}, function(err, allProjects) {
    if(err){ return console.log("error:", err)}
    else {
      res.json({ projects: allProjects });
    }
  });
});

//find a project by title
app.get('/api/projects/:title', function (req, res) {
  // find one book by its id
  var projectTitle = req.params.title;
  db.Project.findOne({ title: projectTitle }, function(err, foundProject){
    if(err){return console.log(err)}
    res.json(foundProject);
  })
});

//create a new restaurant
app.post('/api/restaurants', function (req, res) {
  // create new book with form data (`req.body`)
  console.log("HIT POST");
  var newRestaurant = new db.Restaurant({
    name: req.body.name,
    description: req.body.description,
    address: req.body.address,
    rating: req.body.rating
  })
  newRestaurant.save(function(err, restaurant){
    if (err) {
      return console.log("save error: " + err);
    }
    console.log("saved ", restaurant.name);
    // send back the restaurant
    res.json(restaurant);
  })
});


//get all restaurants
app.get('/api/restaurants', function(req, res){
  db.Restaurant.find({}, function(err, allRestaurants) {
    if(err){ return console.log("error:", err)}
    else {
      res.json({ restaurants: allRestaurants });
    }
  });
})

//get one restaurant by name
app.get('/api/restaurants/:name', function (req, res) {
  // find one book by its id
  var restaurantName = req.params.name;
  db.Restaurant.findOne({ name: restaurantName }, function(err, foundRestaurant){
    if(err){return console.log(err)}
    res.json(foundRestaurant);
  })
});

//get restaurants by rating query
app.get('/api/restaurants/:rating', function (req, res) {
  var restaurantRating = req.params.rating;
  var ratingNumber = restaurantRating.parseInt();
  db.Restaurant.find({ rating: restaurantRating }, function(err, foundRestaurants){
    if(err){return console.log(err)}
    res.json(foundRestaurants);
  })
});

//delete one restaurant
app.delete('/api/restaurants/:id', function (req, res) {
  // get book id from url params (`req.params`)
  console.log('books delete', req.params);
  var restaurantIndex = req.params.id;
  // find the index of the book we want to remove
  var deleteRestaurantIndex = restaurants.findIndex(function(element, index) {
    return (element._id === parseInt(req.params.id)); //params are strings
  });
  console.log('deleting restaurant with index', deleteRestaurantIndex);
  var restaurantToDelete = restaurants[deleteRestaurantIndex];
  books.splice(deleteRestuarantIndex, 1);
  res.json(restaurantToDelete);
});

//restart from the seed data to fix undefined
app.get('/api/restart', function(req, res){
  db.Restaurant.remove({}, function(err, deleted) {
    console.log('removed all restaurants');
    db.Restaurant.create(seedData.restaurants, function(err, restaurantsCreated){
      if (err){
        return console.log("Error:", err);
      }
      console.log("Added all Restaurants", restaurantsCreated);
      db.Project.remove({}, function(err, deadprojects){
        console.log('removed all projects');
        db.Project.create(seedData.projects, function(err, projectsCreated){
          if (err){
            return console.log("Error:", err);
          }

          console.log("Added all Projects", projectsCreated);
          res.redirect('/');
        });
      });
    });
  });
});

/**********
* SERVER *
**********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
