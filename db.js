// const mongoose  = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/iNotebook";

// function connectToMongo(){
//     mongoose.connect(mongoURI, ()=>{
//         console.log("connected to mongoose successfully");
//     })

// }

// module.exports = connectToMongo;

const mongoose = require('mongoose');

connectDB().catch(err => console.log(err));

async function connectDB() {
  await mongoose.connect("mongodb+srv://aryan:prachi12345@cluster0.7m9dmgq.mongodb.net/?retryWrites=true&w=majority");
  console.log("We are connected");
  
}

module.exports = connectDB;