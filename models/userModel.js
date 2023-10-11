const mongoose = require("mongoose");

// database mongoose conection
const db_url = 'mongodb+srv://anas:anas@food.t6wubmw.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_url)
.then(function(db) {
  // console.log(db);
  console.log("db connected.....");
})
.catch(function(err) {
  console.log(err)
});

// USER SCHEMA
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const userModel = mongoose.model("userModel", userSchema);

module.exports =  userModel;