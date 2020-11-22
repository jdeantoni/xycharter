const express = require('express');

const publicRouter = express.Router();
const dataWriterRoute = require('./routes/dataWriter');
const writerDataRoute = require('./routes/writeData');
const deleteDataRoute = require('./routes/deleteData');

publicRouter.use('/', dataWriterRoute);
publicRouter.use('/', writerDataRoute);
publicRouter.use('/', deleteDataRoute);

module.exports = publicRouter;

