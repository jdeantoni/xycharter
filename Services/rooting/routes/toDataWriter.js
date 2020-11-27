const { response } = require('express');
const express = require('express');
const axios = require('axios').default;
const dataWriterRouter = express.Router();
const { body,param, validationResult } = require('express-validator');

const dataWriterService = "http://localhost:4020"

dataWriterRouter.post('/datawriter', [body("points").isArray()]
   , async(req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const reponse = await axios.post(dataWriterService + "/datawriter", req.body )
      

      res.status(200).send(reponse.data.toString());
   } catch (error) {      
      res.status(501).send(error);
   }

   next();
});

dataWriterRouter.delete('/datawriter/:id', [param('id').isInt()], async (req, res, next) => {
   
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
  
   try {
      const reponse = await axios.delete(dataWriterService + "/datawriter/" + req.params.id)
      
      res.status(200).send(reponse.data.toString());
   } catch (error) {      
      res.status(501).send(error);
   }

   next();
});


module.exports = dataWriterRouter;
