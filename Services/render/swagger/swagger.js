const app = require('express')()
const http = require('http')
const swaggerUi = require('swagger-ui-express')
const swaggerAutogen = require('swagger-autogen')()


const outputFile = './swagger/swagger_output.json'
const endpointsFiles = ['./routes/root.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "Render",
        description: "This service render a image for graphs"
    },
    host: "localhost:3060",
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/jpg', 'application/png'],
    definitions: {
    }
}


swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    const swaggerFile = require('./swagger_output.json')
    
    http.createServer(app).listen(3060)
    console.log("Listening at:// port:%s (HTTP)", 3060)
    
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
})