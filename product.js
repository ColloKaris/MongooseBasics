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

  //Define our Schema
  const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true
    }
  }) 


//use the above Schema to create a model
const Product = mongoose.model('Product', productSchema);

//create a product
const bike = new Product({name: 'Mountain Bike', price: 999})
bike.save()
    .then(data => {
        console.log("IT WORKED!!");
        console.log(data);
    })
    .catch(err => {
        console.log("OH NO ERROR!");
        console.log(err);
    })