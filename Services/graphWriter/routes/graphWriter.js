const express = require('express');
const graphWriterRouter = express.Router();
const graphWriterController = require('../controllers/graphWriter');
const { body, validationResult } = require('express-validator');

graphWriterRouter.post('/graph', [body('type').matches(
   "histogramme"
)]
   , (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const graphId = graphWriterController.graphCreation(req.body.type);

      res.status(201).send(graphId);

      next();
   });


module.exports = graphWriterRouter;