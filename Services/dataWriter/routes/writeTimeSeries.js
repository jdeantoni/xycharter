const express = require('express');
const writeTimeSeriesDataRouter = express.Router();
const writeTimeSeries = require('../controllers/writeTimeSeries');
const writeDataSetController = require('../controllers/writeDataSet');
const { body, validationResult } = require('express-validator');


writeTimeSeriesDataRouter.get('/dataSets/timeseries',
    async (req, res, next) => {

          /* 
      #swagger.description = 'Create a timeSerie dataSet'
      #swagger.tags = ['DataSets']
      */

    try {
        const id = await writeDataSetController.writeDataSet(req.body.name, req.body.description, "",true)

      /*
         #swagger.responses[201] = {
            description: 'Return the id of the dataSet created'
         }
      */
        return res.status(201).json(id)
    } catch (error) {

      /*
         #swagger.responses[500] = {
            description: 'Return the error message'
         }
      */
        return res.status(500).json(error)
    }
});

writeTimeSeriesDataRouter.post('/dataSets/timeseries',[body("id").isString(),body("timestamp").isInt(), body("value").isInt() || body("value".isBoolean())], async (req, res, next) => {

   // #swagger start
    /* 
    #swagger.path = '/dataSets/timeseries/'
    #swagger.method = 'post'
    #swagger.description = 'Modify a timeSerie dataSet'
    #swagger.parameters['id'] = {
      in: 'body',
      description: 'The id of the dataSet to modify',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['timestamp'] = {
      in: 'body',
      description: 'The timestamp of the data',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['value'] = {
      in: 'body',
      description: 'The value of the data (int or boolean)',
      required: true,
      type: 'object'
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
        console.log("hii"+ req.body.name)
        await writeTimeSeries.writeTimeSeries(req.body.name,req.body.id,req.body.timestamp, req.body.value)

      /*
         #swagger.responses[201] = {
         }
      */
        return res.status(201).json()
    } catch (error) {

      /*
         #swagger.responses[500] = {
            description: 'Return the error message'
         }
      */
        return res.status(500).send(error.message)
    }
    // #swagger end
});


module.exports = writeTimeSeriesDataRouter;