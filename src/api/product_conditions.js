
import api_base from './api_base.js';

export default class product_conditions extends api_base {

  constructor () {
     super('product_conditions')
  }

  /**
   * 記録+一覧データの読み込み
   * @param  {[type]}  data 新規登録
   * @return {Promise} 一覧用データをPromiseで
   */
  async save_and_read_conditions(data) {
    await this.save(data, 'product');
    let list_data = await this.read();
    return list_data;
  }

}
