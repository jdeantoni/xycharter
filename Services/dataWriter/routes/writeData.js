const express = require('express');
const writeDataRouter = express.Router();
const writeDataController = require('../controllers/writeData');

const { body, validationResult } = require('express-validator');

writeDataRouter.post('/datawriter',[body("points").isArray()]
   , async (req, res, next) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      let id = await writeDataController.writeData(req.body.points);
      return res.status(201).send(id);

   });


module.exports = writeDataRouter;
