var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var ProfileSchema = new Schema ({
    name: 'Justin Rhoads',
    githubUsername: 'rhoadsjustin',
    githubProfileImage: 'https://avatars3.githubusercontent.com/u/26558860?v=3&u=be873be42d6bd7ea2af15179adffa4f0ddee15e4&s=400',
    personalSiteLink: 'rhoadsjustin.github.io',
    currentCity: 'Austin, TX',
    favoriteSportsTeams: [{name: 'Los Angelas Lakers', sport: 'basketball'}, {name: 'Arkansas Razorbacks', sport: 'football and basketball'}]
  })

  var Profile = mongoose.model('Profile', ProfileSchema);

  module.exports = Profile;
