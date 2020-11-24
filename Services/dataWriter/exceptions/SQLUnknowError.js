function SQLUnknowError(err){
    return new Error("Erreur SQL incconu : " + err.message);
}

module.exports = {
    SQLUnknowError
}