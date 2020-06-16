
import $ from 'jquery';

export default class product_conditons {

  constructor () {
    this.url = 'https://us-central1-dummy-80371.cloudfunctions.net/v1/';
  }

  read_conditions() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url:`${this.url}product_conditions`,
            type:'GET'
        }).done((data) => {
            resolve(data)
        }).fail((data) => {
            reject(data)
        })
    });
  }

  save_conditions(data) {

    let url;
    let type;
    if (data['key'] !== undefined) {
      url = `${this.url}product_conditions/${data.key}`;
      type = 'PUT';
    } else {
      url = `${this.url}product_conditions`;
      type = 'POST';
    }

    return new Promise((resolve, reject) => {
        $.ajax({
            url:url,
            type:type,
            contentType:'application/json',
            data:JSON.stringify(data['product']),
        }).done((data) => {
            resolve(data)
        }).fail((data) => {
            reject(data)
        })
    });
  }

  delete_conditions(data) {

    return new Promise((resolve, reject) => {
        $.ajax({
            url:`${this.url}product_conditions`,
            type:'DELETE',
            contentType:'application/json',
            data:JSON.stringify(data['key']),
        }).done((data) => {
            resolve(data)
        }).fail((data) => {
            reject(data)
        })
    });
  }

}
