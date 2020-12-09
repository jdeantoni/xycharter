const express = require('express');
const axios = require('axios').default;
const renderRouter = express.Router();
const { param, query, validationResult } = require('express-validator');

renderRouter.get('/graphs/:id/render', [query('type').matches(
   "PNG|JPG|JSON"
), param('id').isInt()]
   , async(req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   if (req.query.type == "JSON"){
      const reponse = await axios.get(process.env.DBREADER_ADDR + "/datareader/data/" + req.params.id);

      return res.status(200).send(reponse.data[0].datajson);
   } else {
      const reponse = await axios.get(process.env.RENDER_ADDR + "/graphs/" + req.params.id + "?type=" + req.query.type)

      res.setHeader("Content-Type", "image/jpg");
      res.status(201).send(reponse.data);
   }
   next();
});


module.exports = renderRouter;
