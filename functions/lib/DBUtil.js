

const CommonUtil = require('./CommonUtil.js');

const cUtil = new CommonUtil();

module.exports = class DBUtil {

  /**
   * コンストラクタ
   * @param sting database firebaseのdatabase
   */
  constructor(database) {
    this.database = database
  }


  /**
   * firebaseからのデータ取得
   * @param  string  jname jsonのキー名
   * @return {Promise}   データ(Promiseを伴う)
   */
  async getData(jname) {

    const snapshot = await this.database.ref(jname).once('value');


    let items = snapshot.val();
    let data = [];

    if (!cUtil.isEmpty(items)) {
      if (jname == 'master_list') {
        data = items;
      } else {
        for(var key in items) {
            let each_item = items[key];
            each_item['key'] = key;
            data.push(each_item);
        }
      }
    }
    return data;
  }

}
