const express = require('express');
const pug = require('pug');
const app = express();
const port = 3000; // You can choose any available port

// Set the view engine to Pug
app.set('view engine', 'pug');

// Define a route that renders your Pug template
app.get('/', (req, res) => {
  res.render('index');
});

// app.get('/shapes', (req, res) => {
//   res.render('shapes');
// });

app.use(express.static('css'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
