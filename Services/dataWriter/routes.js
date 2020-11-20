const express = require('express');

const publicRouter = express.Router();
const dataWriterRoute = require('./routes/dataWriter');
const writerDataRoute = require('./routes/writeData');

publicRouter.use('/', dataWriterRoute);
publicRouter.use('/', writerDataRoute);

module.exports = publicRouter;