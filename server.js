const express = require('express');

// connect to apiRoutes and htmlRoutes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const { notes } = require('./data/db.json');
const { get } = require('http');

// instantiate the server
const app = express();

// parsing incoming data 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware added using express.static 
app.use(express.static('public'));

// middleware 
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// method to make server listen 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}.`);
});

