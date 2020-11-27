const express = require('express');

const publicRouter = express.Router();
const dataWriterRoute = require('./routes/dataWriter');
const writerDataRoute = require('./routes/writeData');
const deleteDataRoute = require('./routes/deleteData');
const writeTimeSeriesDataRouter = require('./routes/writeTimeSeries')

publicRouter.use('/', dataWriterRoute);
publicRouter.use('/', writerDataRoute);
publicRouter.use('/', deleteDataRoute);
publicRouter.use('/', writeTimeSeriesDataRouter);

module.exports = publicRouter;

