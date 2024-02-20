const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Models = require('./models.js');
const Projects = Models.Project;
const app = express();
const cors = require('cors');
let allowedOrigins = ['http://localhost:8080', 'http://localhost:1234', 'http://localhost:4200', 'https://myflix-client-eaadalen.netlify.app', 'https://eaadalen.github.io'];
const port = process.env.PORT || 8080;
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(morgan('common'));
const passport = require('passport');
require('./passport');

mongoose.connect("mongodb+srv://erikaadalen:lStIKkb8PkTPoS7a@nv5-project-info.hx7f5vb.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

// Greeting message
app.get('/', (req, res) => {
  res.send("Hello");
});

// Gets the full list of projects
app.get('/projects', (req, res) => {
  Projects.find()
      .then((projects) => {
        res.status(201).json(projects);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// listen for requests
app.listen(port, '0.0.0.0',() => {
  console.log('Listening on Port ' + port);
 });