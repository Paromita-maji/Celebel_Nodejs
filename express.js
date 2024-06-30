// server.js
//const express = require("express");
//const app = express();
//const PORT = process.env.PORT || 5000;



// Define a route for handling client communication
//app.get("/", (req, res) => {
// res.send("HI , I AM PARMITA");
//});

// Start the server
//const start = async () => {
//   try {
//       app.listen(PORT, () => {
//           console.log(`${PORT} Yes I am connected`);
//         });
//   }catch(error){
//       console.log(error);
//   }
//};

//start();


//Set up a simple web server using Express.js that can handle basic routing and middleware. Implement routes to respond to at least two different endpoints.

// server.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

app.get('/about', (req, res) => {
  res.send('This is the about page.');
});

app.post('/data', (req, res) => {
  res.json({ message: 'Data received', data: req.body });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
