import {dev_api_url, prod_api_url} from '../api.config.js';
import axios from 'axios';

const api_url = (process.env.NODE_ENV == 'dev') ? dev_api_url : prod_api_url ;

export default class api_base {

  constructor (jname) {
    this.url = api_url;
    this.jname = jname
  }

  read() {
    let url = `${this.url}${this.jname}`;
    return axios.get(url);
  }

  async save(data, prop) {

    let url;
    let type;
    if (data['key'] !== undefined) {
      url = `${this.url}${this.jname}/${data.key}`;
      type = 'PUT';
    } else {
      url = `${this.url}${this.jname}`;
      type = 'POST';
    }
    let res;
    if (type == 'PUT') {
      res = await axios.put(url, data[prop]);
    } else if (type === 'POST') {
      res = await axios.post(url, data[prop]);
    }
    return res;
  }

  /**
   * 削除
   * @param  {[type]} data 削除するデータのキー
   * @return {[Promise]}  結果をPromiseで返す
   */
  delete(data) {
    let url = `${this.url}${this.jname}`;
    return axios.delete(url, {data:data['key']});
  }

}
