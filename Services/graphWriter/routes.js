const express = require('express');

const publicRouter = express.Router();
const graphWriterRoute = require('./routes/graphWriter');
const graphWriterDataRoute = require('./routes/graphWriterData')
const pingRoute = require('./routes/ping')

publicRouter.use('/', graphWriterRoute);
publicRouter.use('/', graphWriterDataRoute);
publicRouter.use('/', pingRoute);

module.exports = publicRouter;