const express = require('express');

const publicRouter = express.Router();
const lateServiceRoute = require('./routes/graphWriter');

publicRouter.use('/', lateServiceRoute);

module.exports = publicRouter;