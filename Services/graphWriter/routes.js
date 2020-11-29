const express = require('express');

const publicRouter = express.Router();
const graphWriterRoute = require('./routes/graphWriter');
const graphWriterDataRoute = require('./routes/graphWriterData')

publicRouter.use('/', graphWriterRoute);
publicRouter.use('/', graphWriterDataRoute);

module.exports = publicRouter;