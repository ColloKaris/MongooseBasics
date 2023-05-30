//connecting Mongoose to Mongo
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/shopApp")
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
    required: true,
    maxlength: 20,
  },
  price: {
    type: Number,
    require: true,
    min: 0,
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: [String],
  //an object where key value pairs are nested and give each
  //a type
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
});

//use the above Schema to create a model
const Product = mongoose.model("Product", productSchema);

//create a product
const bike = new Product({
  name: "Boat Helmet",
  price: 9.5,
  categories: ["Cycling", "Safety"],
});
bike
  .save()
  .then((data) => {
    console.log("IT WORKED!!");
    console.log(data);
  })
  .catch((err) => {
    console.log("OH NO ERROR!");
    console.log(err);
  });
