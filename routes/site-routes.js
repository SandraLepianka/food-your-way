const express    = require("express");
const siteRoutes = express.Router();
const User = require('../models/user');
const Restaurants = require('../models/restaurants');

siteRoutes.get("/", (req, res, next) => {
  res.render("home");
});

siteRoutes.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
});

siteRoutes.get("/dashboard", (req, res, next) => {

  //Promise to get restaurants from database
  const getRestaurants =
    Restaurants.find()
      .then(restaurants => {
        return restaurants;
      })
      .catch(error => {
        console.log(error);
      })
  ;// Ends promise restaurants
  
  Promise.all([getRestaurants])
    .then(results => {
      const restaurants = results[0];
      res.render("dashboard", {restaurants});
    })
    .catch(error => {
      console.log(error)
  })

});

siteRoutes.get("/dashboard/vegetarian", (req, res, next) => {

  Restaurants.find({phone: 'vegetarian'})
    .then(results => {
      console.log("here, motherfucker! ",results);
      const vegetarian = results;
      res.render("dashboard", {vegetarian});
    })
    .catch(error => {
      console.log(error);
    })
;// Ends promise restaurants


})

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  
  res.redirect('/');
}

module.exports = siteRoutes;