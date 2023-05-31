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
    min: [0, 'Price must be positive ya dodo!']
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
  size: {
    type: String,
    enum: ['S', 'M', 'L']
  }
});

//instance method
productSchema.methods.greet = function(){
  console.log("HELLO!!! HI!!! HOWDY!!!");
  console.log(`- from ${this.name}`)
}

//instance method to toggle the onsale between true and false
productSchema.methods.toggleOnSale = function() {
  this.onSale = !this.onSale;
  return this.save();
}

//defining another instance method
productSchema.methods.addCategory = function (newCat) {
  this.categories.push(newCat);
  //returns a thenable object which behaves like a promise
  //and we can await it somewhere else
  return this.save();
}

//use the above Schema to create a model
const Product = mongoose.model("Product", productSchema);

//A method to show that we have access to the instance method
//when you find a particular product
const findProduct = async () => {
  const foundProduct = await Product.findOne({name: 'Bike Helmet'})
  console.log(foundProduct)
  await foundProduct.toggleOnSale();
  console.log(foundProduct)
  await foundProduct.addCategory('Outdoors')
  console.log(foundProduct)
}
findProduct();

//create a product
// const bike = new Product({
//   name: "Cycling Jersey",
//   price: 28.50,
//   categories: ["Cycling"],
//   size: 'L'
// });
// bike
//   .save()
//   .then((data) => {
//     console.log("IT WORKED!!");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("OH NO ERROR!");
//     console.log(err);
//   });


// Product.findOneAndUpdate({name: 'Tire Pump'}, {price: -19.99}, {new: true, runValidators: true})
//   .then((data) => {
//     console.log("IT WORKED!!");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("OH NO ERROR!");
//     console.log(err);
//   });