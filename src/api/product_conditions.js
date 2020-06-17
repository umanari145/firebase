

import {dev_api_url, prod_api_url} from '../api.config.js';
import axios from 'axios';

const api_url = (process.env.NODE_ENV == 'dev') ? dev_api_url : prod_api_url ;

export default class product_conditons {

  constructor () {
    this.url = api_url;
  }

  read_conditions() {
    let url = `${this.url}product_conditions`;
    return axios.get(url);
  }

  async save_conditions(data) {

    let url;
    let type;
    if (data['key'] !== undefined) {
      url = `${this.url}product_conditions/${data.key}`;
      type = 'PUT';
    } else {
      url = `${this.url}product_conditions`;
      type = 'POST';
    }

    let res;
    if (type == 'PUT') {
      res = await axios.put(url, data['product']);
    } else if (type === 'POST') {
      res = await axios.post(url, data['product']);
    }
    return res;
  }

  /**
   * 記録+一覧データの読み込み
   * @param  {[type]}  data 新規登録
   * @return {Promise} 一覧用データをPromiseで
   */
  async save_and_read_conditions(data) {
    await this.save_conditions(data);
    let list_data = await this.read_conditions();
    return list_data;
  }

  /**
   * 削除
   * @param  {[type]} data 削除するデータのキー
   * @return {[Promise]}  結果をPromiseで返す
   */
  delete_conditions(data) {
    let url = `${this.url}product_conditions`;
    return axios.delete(url, {data:data['key']});
  }

}
