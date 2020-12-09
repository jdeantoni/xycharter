const axios = require('axios').default;

const renderFromQC = async (id, type) => {
    const graphCharas = await (await axios.get(process.env.DBREADER_ADDR + "/graphs/" + id)).data;

    const graphDatas = JSON.parse(await (await axios.get(process.env.DBREADER_ADDR + "/datareader/data/" + id)).data[0].datajson);

    var labels = [];
    var datas = [];

    for (var data of graphDatas){
        labels.push("\'" + data.label + "\'");
        datas.push("\'" + data.value + "\'");
    }

    var qcRequest = "https://quickchart.io/chart?c={type:\'" + graphCharas[0].graphtype + "\',data:{labels:[" + labels + "],datasets:[{data:[" + datas + "]}]},options:{plugins:{doughnutlabel:{}}}}";

    const reponse = await axios.get(qcRequest);

    return reponse.data;
}

module.exports = {
    renderFromQC
}


/*https://quickchart.io/chart?c=
{
    type:'doughnut',
    data:{
        labels:[
            'January','February','March','April','May'
        ],
        datasets:[
            {
                data:[
                    50,60,70,180,190
                ]
            }
        ]
    },
    options:{
        plugins:{
            doughnutlabel:{

            }
        }
    }
}*/