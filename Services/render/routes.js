const express = require('express');

const publicRouter = express.Router();
const rootRoute = require('./routes/root');

publicRouter.use('/', rootRoute);

module.exports = publicRouter;