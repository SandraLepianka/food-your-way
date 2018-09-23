const mongoose = require('mongoose');
const Restaurant = require('../models/restaurants');
const restaurants = require('./restaurants');
mongoose.connect('mongodb://localhost/food-your-way');


Restaurant.create(restaurants, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${restaurants.length} restaurants`)
  mongoose.connection.close()
});