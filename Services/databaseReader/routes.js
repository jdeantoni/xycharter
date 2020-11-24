const express = require('express');

const publicRouter = express.Router();
const dataWriterRoute = require('./routes/dataReader');

publicRouter.use('/',dataWriterRoute)

module.exports = publicRouter;

