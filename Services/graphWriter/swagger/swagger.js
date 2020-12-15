const app = require('express')()
const http = require('http')
const swaggerUi = require('swagger-ui-express')
const swaggerAutogen = require('swagger-autogen')()


const outputFile = './swagger/swagger_output.json'
const endpointsFiles = ['./routes/graphWriter.js', './routes/graphWriterData.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "Graph Writer",
        description: "This service is use to write in the database (postgre) the information about graphs and link beetween graphs and datasets"
    },
    host: "localhost:3010",
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {
        graph: {
            name : "Super graph !",
            description: "A super graph",
            type : "circlePoint",
            showX:true,
            showGrid:true,
            xBounds:{lowerBound: 10, upperBound: 15.54},
            xLegend:"My x axe",
            graphLegend:"My legend",
            backgroundColor:{r:12,g:13,b:14,a:15},
            gridColor:{r:12,g:13,b:14,a:15}
        }
    }
}


swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    const swaggerFile = require('./swagger_output.json')
    
    http.createServer(app).listen(3000)
    console.log("Listening at:// port:%s (HTTP)", 3010)
    
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
})