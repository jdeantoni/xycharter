const express = require('express');

const publicRouter = express.Router();
const graphWriterRoute = require('./routes/graphWriter');
const graphWriterDataRoute = require('./routes/graphWriterData')
const graphCharaWriterRoute = require('./routes/graphCharaWriter')

publicRouter.use('/', graphWriterRoute);
publicRouter.use('/', graphWriterDataRoute);
publicRouter.use('/', graphCharaWriterRoute);

module.exports = publicRouter;