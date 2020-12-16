const app = require('express')()
const http = require('http')
const swaggerUi = require('swagger-ui-express')
const swaggerAutogen = require('swagger-autogen')()


const outputFile = './swagger/swagger_output.json'
const endpointsFiles = ['./routes/dataReader.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "DataReader",
        description: "This service is use to read datas from database (influx and postgre)"
    },
    host: "localhost:3030",
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {
      graph: {
        "idgraph": 2,
        "name":  "Super graph !",
        "description": "A super graph",
        "creationdate": "2020-12-09T13:11:59.165Z",
        "graphtype": "doughnut",
        "characteristics": "{\"labels\":[{\"text\":\"550\",\"font\":{\"size\":20}},{\"text\":\"total\"}]}"
      },
      graphIds: [
        {
            "idgraph": 1
        },
        {
            "idgraph": 2
        },
        {
            "idgraph": 3
        }
      ],
      dataSet: {
        "iddataset": 1,
        "name": "myDataSet",
        "description": "It's my dataSet",
        "creationdate": "2020-12-10T08:02:06.680Z",
        "datajson": "[{\"label\":\"January\",\"value\":20},{\"label\":\"February\",\"value\":60},{\"label\":\"March\",\"value\":70},{\"label\":\"April\",\"value\":180},{\"label\":\"May\",\"value\":290}]"
      },
      dataSetIds: [
        {
            "iddataset": 1
        },
        {
            "iddataset": 2
        },
        {
            "iddataset": 3
        },
        {
            "iddataset": 5
        }
      ],
      allDatas: [
        {
            "datajson": "[{\"label\":\"January\",\"value\":50},{\"label\":\"February\",\"value\":60},{\"label\":\"March\",\"value\":70},{\"label\":\"April\",\"value\":180},{\"label\":\"May\",\"value\":190}]"
        },
        {
            "datajson": "[{\"label\":\"January\",\"value\":20},{\"label\":\"February\",\"value\":60},{\"label\":\"March\",\"value\":70},{\"label\":\"April\",\"value\":180},{\"label\":\"May\",\"value\":290}]"
        },
        {
            "datajson": "[{\"label\":\"June\",\"value\":20},{\"label\":\"February\",\"value\":60},{\"label\":\"March\",\"value\":70},{\"label\":\"April\",\"value\":180},{\"label\":\"May\",\"value\":290}]"
        }
      ],
      graphTypes: [
        {
            "idgraphtype": 1,
            "graphtype": "histogramme",
            "servicename": "XYCharter"
        },
        {
            "idgraphtype": 2,
            "graphtype": "connectedLine",
            "servicename": "XYCharter"
        },
        {
            "idgraphtype": 3,
            "graphtype": "doughnut",
            "servicename": "QuickChart"
        }
        ]
    }
}


swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    const swaggerFile = require('./swagger_output.json')
    
    http.createServer(app).listen(3030)
    console.log("Listening at:// port:%s (HTTP)", 3030)
    
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
})