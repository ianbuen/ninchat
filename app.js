const port = process.env.PORT || 5000;
require("dotenv").config();
const express = require("express"); 
const session = require("express-session"); 
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');

const app = express();

// middleware
app.use(express.json());
app.use(cors());


// mongoose connection 
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DBPATH); 


console.clear();


// routes
app.use(require("./routes/index.js"));


// handler for client build
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
    });
}


app.listen(port, () => {
    console.log("Server now running.");
});