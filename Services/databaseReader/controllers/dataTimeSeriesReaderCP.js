

async function getTimeSeriesByIdDataSet(idDataSet, choice) {
    let dataTimeSeries = []
    
    var a0 = new Date((new Date(98, 1)).setSeconds(0)).toString()
    var a1 = new Date((new Date(98, 1)).setSeconds(1)).toString()
    var a2 = new Date((new Date(98, 1)).setSeconds(2)).toString()
    var a3 = new Date((new Date(98, 1)).setSeconds(3)).toString()
    var a4 = new Date((new Date(98, 1)).setSeconds(4)).toString()
    var a5 = new Date((new Date(98, 1)).setSeconds(5)).toString()
    
    if (choice == 0){
        dataTimeSeries.push({time : a0, value: 1})
        dataTimeSeries.push({time : a1, value: 4})
        dataTimeSeries.push({time : a2, value: 5})
    } else if (choice == 1){
        dataTimeSeries.push({time : a0, value: true})
        dataTimeSeries.push({time : a1, value: false})
        dataTimeSeries.push({time : a2, value: true})
    } else if (choice == 2){
        dataTimeSeries.push({time : a0, value: 1})
        dataTimeSeries.push({time : a1, value: 4})
        dataTimeSeries.push({time : a2, value: 5})
        dataTimeSeries.push({time : a3, value: 8})
        dataTimeSeries.push({time : a4, value: 9})
        dataTimeSeries.push({time : a5, value: 3})
    } else if (choice == 3){
        dataTimeSeries.push({time : a0, value: true})
        dataTimeSeries.push({time : a1, value: false})
        dataTimeSeries.push({time : a2, value: true})
        dataTimeSeries.push({time : a3, value: true})
        dataTimeSeries.push({time : a4, value: false})
        dataTimeSeries.push({time : a5, value: false})
    }
    return dataTimeSeries


}


module.exports = {
    getTimeSeriesByIdDataSet
}
