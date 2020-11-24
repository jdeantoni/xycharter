class DataSetIdNotFoundException extends Error {
    constructor() {
      super()
      this.name = 'DATA_ID_NOT_FOUND'
      this.message = "The id was not found in database"
    }
  }

  module.exports = {
    DataSetIdNotFoundException
  };