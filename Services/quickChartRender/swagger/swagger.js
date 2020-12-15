const app = require('express')()
const http = require('http')
const swaggerUi = require('swagger-ui-express')
const swaggerAutogen = require('swagger-autogen')()


const outputFile = './swagger/swagger_output.json'
const endpointsFiles = ['./routes/render.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "QuickChart render",
        description: "This service render a image for graphs who using a quickChart graph"
    },
    host: "localhost:3050",
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/jpg'],
    definitions: {
    }
}


swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    const swaggerFile = require('./swagger_output.json')
    
    http.createServer(app).listen(3050)
    console.log("Listening at:// port:%s (HTTP)", 3050)
    
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
})