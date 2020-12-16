const express = require('express');

const publicRouter = express.Router();
const writerDataRoute = require('./routes/writeData');
const deleteDataRoute = require('./routes/deleteData');
const writeTimeSeriesDataRouter = require('./routes/writeTimeSeries')
const pingRouter = require('./routes/ping')

publicRouter.use('/', writerDataRoute);
publicRouter.use('/', deleteDataRoute);
publicRouter.use('/', writeTimeSeriesDataRouter);
publicRouter.use('/', pingRouter);

module.exports = publicRouter;

