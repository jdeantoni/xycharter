const fs = require('fs');

const graphCharaValidator = (req) => {
    var errors = [];
    try {
        const applicationCharaAccepted = JSON.parse(fs.readFileSync('./controllers/charaAccepted.json'));
        var charasAccepteds = {};

        for (const application of applicationCharaAccepted){
            Object.assign(charasAccepteds, application.constraints);
        }

        for (const [key, value] of Object.entries(req.body)) {
            var find = false;

            for (var i = 0; i < Object.keys(charasAccepteds).length; i++){
                if (Object.keys(charasAccepteds)[i] == key){
                    find = true;
                    if (validate(value, Object.values(charasAccepteds)[i]) == false){
                        errors.push({
                            "location": "body",
                            "msg": "Invalid type of value for " + key + ", type of value required : " + Object.values(charasAccepteds)[i],
                            "param": "characteristics"
                        });
                    }
                    break;
                }
            }

            if (find == false){
                errors.push({
                    "location": "body",
                    "msg": "Key unknown " + key,
                    "param": "characteristics"
                });
            }
        }
    } catch (error) {
        errors.push("Erreur dans la lecture du fichier charaAccepted : " + error.message);
    }

    return errors;
}

const validate = (arg, typeRequired) => {
    switch (typeRequired){
        case "other":
            return true;
        default:
            return (typeof arg) == typeRequired;
    }
}


module.exports = {
    graphCharaValidator
}