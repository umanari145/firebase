
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

  save_conditions(product_conditions) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url:`${this.url}product_conditions`,
            type:'POST',
            contentType:'application/json',
            data:product_conditions
        }).done((data) => {
            resolve(data)
        }).fail((data) => {
            reject(data)
        })
    });
  }
}
