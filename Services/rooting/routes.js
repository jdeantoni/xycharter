const express = require('express');

const publicRouter = express.Router();
const toGraphWriterRoute = require('./routes/toGraphWriter');
const toDataWriterRoute = require('./routes/toDataWriter');
const toDataGraphWriterRoute = require('./routes/toDataGraphWriter');
const toDatabaseReaderRoute = require('./routes/toDatabaseReader');
const toRenderServiceRoute = require('./routes/toRenderService');
const pingRoute = require('./routes/ping');

publicRouter.use('/', toGraphWriterRoute);
publicRouter.use('/', toDataWriterRoute);
publicRouter.use('/', toDataGraphWriterRoute);
publicRouter.use('/', toDatabaseReaderRoute);
publicRouter.use('/', toRenderServiceRoute);
publicRouter.use('/', pingRoute);

module.exports = publicRouter;