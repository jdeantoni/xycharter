const axios = require('axios').default;

const renderFromQC = async (id, charas) => {    
    const graphDatas = await (await axios.get(process.env.DBREADER_ADDR + "/graphs/" + id + "/datas")).data;


    //Initialization of the labels
    var labels = new Set();
    for (var dataSet of graphDatas){
        var dataSetObj = JSON.parse(dataSet.datajson)
        if (labels.size == 0){
            for (var point of dataSetObj){
                labels.add(point.label);
            }
        } else {
            for (var point of dataSetObj){
                if (labels.has(point.label) == false){
                    return "error";
                }
            }
        }
    }

    var labelsArray = Array.from(labels);
    var datasArray = []
    //Initialization of the values
    for (var dataSet of graphDatas){
        var dataSetObj = JSON.parse(dataSet.datajson)
        var data = []
        for (var label of labelsArray){
            for (var points of dataSetObj){
                if (points.label === label){
                    data.push(points.value)
                    break;
                }
            }
        }
        datasArray.push({"data":data})
    }

    const datasArrayStr = JSON.stringify(datasArray).replace(/"/g, '')

    var labelsArrayStr = [];
    for (var label of Array.from(labels)){
        labelsArrayStr.push("\'" + label + "\'");
    }
    //Send the request to Quickchart
    var qcRequest = "https://quickchart.io/chart?c={type:\'doughnut\',data:{labels:[" + labelsArrayStr + "],datasets:" + datasArrayStr + "},options:{plugins:{doughnutlabel:" + charas + "}}}";

    console.log(qcRequest);

    const reponse = await axios.get(qcRequest);

    return reponse.data;
}

module.exports = {
    renderFromQC
}

