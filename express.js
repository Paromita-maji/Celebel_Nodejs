// server.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;



// Define a route for handling client communication
app.get("/", (req, res) => {
  res.send("HI , I AM PARMITA");
});

// Start the server
const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`${PORT} Yes I am connected`);
          });
    }catch(error){
        console.log(error);
    }
};

start();

