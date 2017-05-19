var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var RestaurantSchema = new Schema ({
    name: String,
    description: String,
    address: String,
    rating: Number
  })

  var Restaurant = mongoose.model('Restaurant', RestaurantSchema);

  module.exports = Restaurant;
