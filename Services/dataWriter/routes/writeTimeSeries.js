const express = require('express');
const writeTimeSeriesDataRouter = express.Router();
const writeTimeSeries = require('../controllers/writeTimeSeries');

const writeDataSet = require('../controllers/writeDataSet');

const { body, validationResult } = require('express-validator');


writeTimeSeriesDataRouter.get('/datawriter/timeseries', async (req, res, next) => {

    try {
        const id = await writeDataSet.writeDataSetIdTimeSeries(true)
        return res.status(201).send(id)
    } catch (error) {
        return res.status(500).send(error)
    }
});

writeTimeSeriesDataRouter.post('/datawriter/timeseries',[body("id").isString(),body("timestamp").isInt(),body("value").isInt()], async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        await writeTimeSeries.writeTimeSeries(req.body.id,req.body.timestamp, req.body.value)
        return res.status(201).send()
    } catch (error) {
        return res.status(500).send(error)
    }
});


module.exports = writeTimeSeriesDataRouter;