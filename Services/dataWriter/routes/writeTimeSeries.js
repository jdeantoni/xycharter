const express = require('express');
const writeTimeSeriesDataRouter = express.Router();
const writeTimeSeries = require('../controllers/writeTimeSeries');
const writeDataSetController = require('../controllers/writeDataSet');
const { body, validationResult } = require('express-validator');


writeTimeSeriesDataRouter.get('/dataSets/timeseries', [body("name").isString()],
    async (req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
   }

    try {
        const id = await writeDataSetController.writeDataSet(req.body.name, req.body.description, "", true)
        return res.status(201).send(id)
    } catch (error) {
        return res.status(500).send(error)
    }
});

writeTimeSeriesDataRouter.post('/dataSets/timeseries',[body("name").isString(),body("id").isString(),body("timestamp").isInt()||body("value").isInt()], async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        await writeTimeSeries.writeTimeSeries(req.body.name,req.body.id,req.body.timestamp, req.body.value)
        return res.status(201).send()
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
});


module.exports = writeTimeSeriesDataRouter;