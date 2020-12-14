const express = require('express');
const writeDataRouter = express.Router();
const writeDataSetController = require('../controllers/writeDataSet');

const { body, param, validationResult } = require('express-validator');

//Création d'un jeux de donnée
writeDataRouter.post('/datawriter',[body("name").isString(),body("points").isArray()]
   , async (req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
   }
   let id = await writeDataSetController.writeDataSet(req.body.name, req.body.description, req.body.points);
   return res.status(201).send(id);

});
   
//modification d'un jeux de donnée
writeDataRouter.put('/datawriter/:id', [param('id').isInt()], async (req, res, next) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
      }

      try {
            await writeDataSetController.modifyDataSet(req.params.id, req.body);

            res.status(201).send("MODIFY");
      } catch (error) {
            res.status(500).send(error.message);
      }

      next();
});


module.exports = writeDataRouter;
