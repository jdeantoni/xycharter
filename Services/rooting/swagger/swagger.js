const app = require('express')()
const http = require('http')
const swaggerUi = require('swagger-ui-express')
const swaggerAutogen = require('swagger-autogen')()


const outputFile = './swagger/swagger_output.json'
const endpointsFiles = ['./routes/toGraphWriter.js', './routes/toDataWriter.js', './routes/toDataGraphWriter.js', './routes/toDatabaseReader.js', './routes/toRenderService.js']

swaggerAutogen(outputFile, endpointsFiles)

const swaggerFile = require('./swagger_output.json')

http.createServer(app).listen(3000)
console.log("Listening at:// port:%s (HTTP)", 3000)

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))