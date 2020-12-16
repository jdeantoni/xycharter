const express = require('express');

const publicRouter = express.Router();
const dataWriterRoute = require('./routes/dataReader');
const pingRoute = require('./routes/ping');

publicRouter.use('/',dataWriterRoute)
publicRouter.use('/',pingRoute)

module.exports = publicRouter;

