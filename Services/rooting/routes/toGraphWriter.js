const express = require('express');
const axios = require('axios').default;
const graphWriterRouter = express.Router();
const { body,param, validationResult } = require('express-validator');

const graphWriterService = "http://localhost:4010"

graphWriterRouter.post('/graphs', [body('type').matches(
   "histogramme"
)]
   , async(req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }


   try {
      const reponse = await axios.post(graphWriterService + "/graphs", {body :{"type": req.body.type}})
      
      console.log(reponse)

      res.status(201).send(reponse);
   } catch (error) {
      console.log(graphWriterService + "/graphs")
      
      res.status(500).send(error);
   }


   next();
});


module.exports = graphWriterRouter;
