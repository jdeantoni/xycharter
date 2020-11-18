const express = require('express');

const publicRouter = express.Router();
const dataWriterRoute = require('./routes/dataWriter');

publicRouter.use('/', dataWriterRoute);

module.exports = publicRouter;