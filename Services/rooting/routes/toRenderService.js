const { response } = require('express');
const express = require('express');
const axios = require('axios').default;
const renderRouter = express.Router();
const { param, query, validationResult } = require('express-validator');

renderRouter.get('/graphs/:id', [query('type').matches(
   "PNG|JPG|JSON"
), param('id').isInt()]
   , async(req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   const reponse = await axios.get(process.env.RENDER_ADDR + "/graphs/" + req.params.id + "?type=" + req.query.type)

   res.setHeader("Content-Type", "image/jpg");
   res.status(201).send(reponse);
   next();
});


module.exports = renderRouter;
