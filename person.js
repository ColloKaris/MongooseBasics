// Mongoose Virtuals
//connecting Mongoose to Mongo
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/shopApp")
  .then(() => {
    console.log("CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO ERROR!!!");
    console.log(err);
  });

  //make schema
  const personSchema = new mongoose.Schema({
    first: String,
    last: String
  })

  personSchema.virtual('fullName').get(function() {
    //this refers to the individual instance we are working with
    return `${this.first} ${this.last}`
  })

//Defining Mongoose Middleware
personSchema.pre('save', async function() {
    this.first = 'YO';
    this.last = 'MAMA'
    console.log("ABOUT TO SAVE!!!")
  })
  personSchema.pre('save', async function() {
    console.log("JUST SAVED!!!")
  })


  //make model
  const Person = mongoose.model('Person', personSchema)