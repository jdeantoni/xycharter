function SQLLinkAlreadyExistException(){
    return new Error("Link Already Exist");
}

module.exports = {
    SQLLinkAlreadyExistException
}