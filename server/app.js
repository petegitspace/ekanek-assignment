const express = require('express');
const app = express();

const downloadRoutes = require('./api/routes/downloads');

app.use('/downloads', downloadRoutes);

module.exports = app;