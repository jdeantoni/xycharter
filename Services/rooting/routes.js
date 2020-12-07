const express = require('express');

const publicRouter = express.Router();
const toGraphWriterRoute = require('./routes/toGraphWriter');
const toDataWriterRoute = require('./routes/toDataWriter');
const toDataGraphWriterRoute = require('./routes/toDataGraphWriter');
const toDataGraphCharaWriterRoute = require('./routes/toGraphCharaWriter');
const toDatabaseReaderRoute = require('./routes/toDatabaseReader');
const toRenderServiceRoute = require('./routes/toRenderService');

publicRouter.use('/', toGraphWriterRoute);
publicRouter.use('/', toDataWriterRoute);
publicRouter.use('/', toDataGraphWriterRoute);
publicRouter.use('/', toDataGraphCharaWriterRoute);
publicRouter.use('/', toDatabaseReaderRoute);
publicRouter.use('/', toRenderServiceRoute);

module.exports = publicRouter;