const express = require('express');
const renderRouter = express.Router();
const { param, query, validationResult } = require('express-validator');
const { renderFromQC } = require('../controllers/render');

renderRouter.get('/graphs/:id', [query('type').matches(
   "PNG|JPG"
), param('id').isInt()]
   , async(req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   const reponse = await renderFromQC(req.params.id, req.query.type);

   res.setHeader("Content-Type", "image/jpg");
   res.status(201).send(reponse);
   
   next();
});


module.exports = renderRouter;
