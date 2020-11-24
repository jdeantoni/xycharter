const express = require('express');
const writeDataRouter = express.Router();
const writeDataSetController = require('../controllers/writeDataSet');

const { body, validationResult } = require('express-validator');

writeDataRouter.post('/datawriter',[body("points").isArray()]
   , async (req, res, next) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      let id = await writeDataSetController.writeDataSet(req.body.points);
      return res.status(201).send(id);

   });


module.exports = writeDataRouter;
