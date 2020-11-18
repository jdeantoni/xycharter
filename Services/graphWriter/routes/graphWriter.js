const express = require('express');
const graphWriterRouter = express.Router();
const graphWriterController = require('../controllers/graphWriter');
const { body, validationResult } = require('express-validator');

graphWriterRouter.post('/graph', [body('type').isString()]
   , (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      graphWriterController.graphCreation(req.body.type);

      res.status(201).send();

      next();
   });


module.exports = graphWriterRouter;
