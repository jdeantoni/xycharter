const express = require('express');

const publicRouter = express.Router();
const renderRoute = require('./routes/render');

publicRouter.use('/', renderRoute);

module.exports = publicRouter;