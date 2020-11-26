const express = require('express');
const graphWriterRouter = express.Router();
const graphWriterController = require('../controllers/graphWriter');
const { param, validationResult } = require('express-validator');

graphWriterRouter.post('/graphs', async(req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const graphId = await graphWriterController.graphCreation(req.body.type);
   
      res.status(201).send(graphId);
   } catch (error) {
      res.status(500).send(error.message);
   }

   next();
});

graphWriterRouter.delete('/graphs/:id', [param('id').isString()], async (req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      await graphWriterController.graphDelete(req.params.id);
   
      res.status(201).send("DELETED");
   } catch (error) {
      res.status(500).send(error.message);
   }

   next();
});


module.exports = graphWriterRouter;
