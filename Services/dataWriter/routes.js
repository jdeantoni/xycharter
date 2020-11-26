const express = require('express');

const publicRouter = express.Router();
const dataWriterRoute = require('./routes/dataWriter');
const writerDataRoute = require('./routes/writeData');
const writerTimeSeriesRoute = require('./routes/writeTimeSeries');
const deleteDataRoute = require('./routes/deleteData');

publicRouter.use('/', dataWriterRoute);
publicRouter.use('/', writerDataRoute);
publicRouter.use('/', deleteDataRoute);
publicRouter.use('/', writerTimeSeriesRoute);

module.exports = publicRouter;

