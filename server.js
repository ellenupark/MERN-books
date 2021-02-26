const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

require('./models/Book');

// configure body parser for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use(express.static('client/build'));


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// routes

// Bootstrap server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});

app.use(routes);
