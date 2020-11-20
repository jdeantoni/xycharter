const express = require('express');
const graphWriterRouter = express.Router();
const graphWriterController = require('../controllers/graphWriter');
const { body, query, validationResult } = require('express-validator');

graphWriterRouter.post('/graph', [body('type').matches(
   "histogramme"
)], (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   const graphId = graphWriterController.graphCreation(req.body.type);

   res.status(201).send(graphId);

   next();
});

graphWriterRouter.delete('/graph', [query('id').exists()], (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   graphWriterController.graphDelete(req.query.id);

   res.status(201).send("DELETED");

   next();
});


module.exports = graphWriterRouter;
