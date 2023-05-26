//connecting Mongoose to Mongo
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/movieApp")
  .then(() => {
    console.log("CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO ERROR!!!");
    console.log(err);
  });

//create a schema. Everything in Mongoose is derived from a schema
//a schema maps to a MongoDB Collection and defines the shape of the
//documents within that collection

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

//take the schmea above and tell Mongoose you want to make a model using
//that schema
const Movie = mongoose.model("Movie", movieSchema);

//now you can make new instances of your Movie class and you can save
//them to your mongo database
// const amadeus = new Movie({
//   title: "Amadeus",
//   year: 1986,
//   score: 9.2,
//   rating: "R",
// });

Movie.insertMany([
    {title: 'Amelie', year: 2001, score: 8.3, rating: 'R'},
    {title: 'Alien', year: 1979, score: 8.1, rating: 'R'},
    {title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG'},
    {title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R'},
    {title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13'}
])
.then(data => {
    console.log("IT WORKED");
    console.log(data);
})
