const generateRandomPoint2D = (numberPoint,max) =>{
    let points = [];
    for(let i=0;i<numberPoint;i++){
        let point = {x:getRandomInt(max),y:getRandomInt(max)};
        points.push(point)
    }

    return points;

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = {
    generateRandomPoint2D
}