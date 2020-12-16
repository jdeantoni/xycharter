const app = require('express')()
const http = require('http')
const swaggerUi = require('swagger-ui-express')
const swaggerAutogen = require('swagger-autogen')()


const outputFile = './swagger/swagger_output.json'
const endpointsFiles = ['./routes/deleteData.js', './routes/writeData.js', './routes/writeTimeSeries.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "Data Writer",
        description: "This service is use to write in the database (postgre and influx) the information about datas"
    },
    host: "localhost:3020",
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {
        points: [
            {
                "x": 307,
                "y": 22
            },
            {
                "x": 610,
                "y": 135
            },
            {
                "x": 750,
                "y": 602
            }
        ],
        dataSet : {
            name: "dataSet name",
            description: "dataSet description",
            points: [
                {
                  "label": "January",
                  "value": 50
                },
                {
                  "label": "February",
                  "value": 60
                },
                {
                  "label": "March",
                  "value": 70
                },
                {
                  "label": "April",
                  "value": 180
                },
                {
                  "label": "May",
                  "value": 190
                }
              ]
        }
    }
}


swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    const swaggerFile = require('./swagger_output.json')
    
    http.createServer(app).listen(3020)
    console.log("Listening at:// port:%s (HTTP)", 3020)
    
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
})