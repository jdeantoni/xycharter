const express = require('express');
const pingRouter = express.Router();

pingRouter.get('/ping'
, async (req, res, next) => {

   return res.status(200).send("ok");

});


module.exports = pingRouter;