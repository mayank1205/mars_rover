const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');
const app = express();
const port = 3000;
const { createRover, moveRover, getRoverPosition } = require('./rover-api');


app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World, from express');
});

app.post(`/rover`, (req, res) => createRover(req, res))

app.get(`/rover`, (req, res) => getRoverPosition(req, res))

app.post('/move', (req, res) => moveRover(req, res))

app.listen(port, () => console.log(`Mars rover app listening on port ${port}!`));