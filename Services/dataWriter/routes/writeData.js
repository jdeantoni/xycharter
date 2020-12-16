const express = require('express');
const writeDataRouter = express.Router();
const writeDataSetController = require('../controllers/writeDataSet');

const { body, param, validationResult } = require('express-validator');

writeDataRouter.post('/dataSets',[body("points").isArray()]
   , async (req, res, next) => {
      /* 
      #swagger.description = 'Create a dataSet'
      #swagger.parameters['points'] = {
         in: 'body',
         description: 'Point of the dataSet',
         required: true,
         type: 'object',
         schema: { $ref: "#/definitions/points" }
        }
      #swagger.tags = ['DataSets']
      */

      const errors = validationResult(req);
      if (!errors.isEmpty()) {

            /*
            #swagger.responses[400] = {
                  description: 'Return the validation error array from express validator'
            }
            */
            return res.status(400).json({ errors: errors.array() });
      }

      try {
            let id = await writeDataSetController.writeDataSet(req.body.name, req.body.description, req.body.points);

            /*
            #swagger.responses[201] = {
                  description: 'Return the id of the new dataSet'
            }
            */
            return res.status(201).send(id);
      } catch (error) {
            /*
            #swagger.responses[500] = {
                  description: 'Return the error message'
            }
            */
            res.status(500).send(error.message);
      }

});

writeDataRouter.put('/dataSets/:id', [param('id').isInt()], async (req, res, next) => {
      /* 
      #swagger.description = 'Modify a specific dataSet'
      #swagger.parameters['id'] = {
         in: 'param',
         description: 'The id of the dataSet to modify',
         required: true,
         type: 'integer'
        }
      #swagger.parameters['information to modify'] = {
         in: 'body',
         description: 'Element of the dataSet to modify',
         required: true,
         type: 'object',
         schema: { $ref: "#/definitions/dataSet" }
        }
      #swagger.tags = ['DataSets']
      */


      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            /*
            #swagger.responses[400] = {
                  description: 'Return the validation error array from express validator'
            }
            */
            return res.status(400).json({ errors: errors.array() });
      }

      try {
            await writeDataSetController.modifyDataSet(req.params.id, req.body);

            /*
            #swagger.responses[201] = {
                  description: 'MODIFY'
            }
            */
            res.status(201).send("MODIFY");
      } catch (error) {
            /*
            #swagger.responses[500] = {
                  description: 'Return the error message'
            }
            */
            res.status(500).send(error.message);
      }

      next();
});


module.exports = writeDataRouter;
