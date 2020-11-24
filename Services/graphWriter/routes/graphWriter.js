const express = require('express');
const graphWriterRouter = express.Router();
const graphWriterController = require('../controllers/graphWriter');
const { body,param, validationResult } = require('express-validator');

graphWriterRouter.post('/graphs', [body('type').matches(
   "histogramme"
)]
   , async(req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const graphId = await graphWriterController.graphCreation(req.body.type);

   res.status(201).send(graphId);

   next();
});

graphWriterRouter.delete('/graphs/:id', [param('id').isString()], (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   graphWriterController.graphDelete(req.params.id);

   res.status(201).send("DELETED");

   next();
});


module.exports = graphWriterRouter;
