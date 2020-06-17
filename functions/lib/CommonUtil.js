
module.exports = class CommonUtil {


  constructor(database) {
    this.database = database
  }

  isEmpty(str) {
    return (str === undefined || str === null || str === "");
  }

}
