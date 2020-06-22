<template>
<div class="modal_wrapper">
  <modal name="product_conditions" :width="1200" :height="550" @before-open="set_filter_product_condition">
    <div class="spininng_back" v-if="is_show_spinner == 1">
      <b-spinner label="Spinning" type="grow">
      </b-spinner>
    </div>
    <div class="modal_wrapper">
      <div class="modal_title">自動予約Webツール - 商品条件</div>
      <div class="t_r" style="width:95%;">
        <button v-on:click="close_product_modal">閉じる</button>
      </div>
      <!--一覧-->
      <div v-show="is_show_list" class="table_wrapper">
        *行をクリックすると編集できます。
        <div class="modal_button_area">
          <button style="margin-right:15px;" @click="edit_product_row()">新規追加</button>
          <button @click="delete_conditions">削除</button>
        </div>
        <table class="table_fix">
          <thead class="table_fix_head">
            <tr style="background:#E3E3E3;">
              <th class="col_10">行番号</th>
              <th class="col_10">削除</th>
              <th class="col_40">商品名</th>
              <th class="col_40">価格帯</th>
            </tr>
          </thead>
          <tbody class="table_fix_body">
            <tr :key="index" v-for="(product, index) in filter_product_conditions" @click="edit_product_row(product, index)">
              <td class="col_10 t_c">
                {{index + 1}}
              </td>
              <td class="col_10 t_c" v-on:click.stop="hoge">
                <input type="checkbox" v-model="delete_keys" :value="product.key">
              </td>
              <td class="col_40">
                {{product.product_name}}
              </td>
              <td class="col_40 t_c">
                {{between_price(product)}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--個別編集-->
      <div v-show="is_show_edit" class="table_wrapper">
        <table class="edit_table">
          <thead>
            <tr style="background:#E3E3E3;">
              <th class="col_15 t_c">番号</th>
              <th class="col_45 t_c">商品名</th>
              <th class="col_40 t_c">価格帯</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {{single_product.index}}
              </td>
              <td class="col_45">
                <input type="text" class="condition_input centering" style="margin-top:10px;" v-model="single_product.product_name">
                <div class="condition_err">
                  {{product_err}}
                </div>
              </td>
              <td class="col_55 t_c">
                <span style="display:flex;align-itmes:center;margin-top:10px;" class="centering">
                  <input type="text" v-model="single_product.price_min" style="width:45%;" class="condition_input t_r">
                  <span style="margin:0 5px;">〜</span>
                <input type="text" v-model="single_product.price_max" style="width:45%;" class="condition_input t_r">
                </span>
                <div class="condition_err">
                  {{price_err}}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="modal_button_area">
          <button style="margin-right:15px;" @click="save_conditions">保存</button>
          <button @click="back_to_list">一覧に戻る</button>
        </div>
      </div>
    </div>
  </modal>
</div>
</template>

<script>
import Sugar from 'sugar';
import Validator from 'validatorjs';
import product_conditions from '../api/product_conditions.js';

const pc = new product_conditions();


export default {
  computed: {
    product_conditions: {
      get() {
        return this.$store.getters["product_conditions/get_product_conditions"];
      },
      set(val) {
        this.$store.commit("product_conditions/set_product_conditions", val);
      }
    },
    user: {
      get() {
        return this.$store.getters["user/get_user"];
      }
    }
  },
  methods: {
    hoge() {

    },
    set_filter_product_condition() {
      this.is_show_list = 1;
      this.filter_product_conditions = [];
      this.filter_product_conditions = this.product_conditions;
    },
    save_conditions() {
      if (window.confirm("この商品を保存しますか?")) {
        this.product_err = '';
        this.price_err = '';

        let data = {
          product_name: this.single_product.product_name || '',
          price_min: this.single_product.price_min || '',
          price_max: this.single_product.price_max || ''
        };

        let rules = {
          'product_name': 'required',
          'price_min': 'integer',
          'price_max': 'integer',
        };

        let error_msg = {
          "required.product_name": '商品名が未入力です。',
          integer: '価格は数値で入力してください。',
        }

        let validation = new Validator(data, rules, error_msg);
        validation.check();
        if (validation.errorCount > 0) {
          this.product_err = validation.errors.get('product_name')[0];
          if (validation.errors.get('price_min').length > 0) {
            this.price_err = validation.errors.get('price_min')[0]
          }
          if (this.price_err == '' && validation.errors.get('price_max').length > 0) {
            this.price_err = validation.errors.get('price_max')[0];
          }
        }

        if (this.price_err == '' && parseInt(this.single_product.price_min) > parseInt(this.single_product.price_max)) {
          this.price_err = "価格の範囲が不正です。";
        }

        if (this.product_err !== '' || this.price_err !== '') {
          return false;
        }

        let params = {
          'product': this.single_product
        };

        if (this.single_product.key !== undefined) {
          params['key'] = this.single_product.key;
        }

        this.is_show_spinner = 1;
        pc.save_and_read_conditions(params)
          .then((res) => {
            if (res['data']['res'] !== undefined && res['data']['res'] == true) {
              this.product_conditions = res['data']['data'];
              this.filter_product_conditions = res['data']['data'];
              alert("保存に成功しました。");
              this.is_show_edit = 0;
              this.is_show_list = 1;
            }
          }).catch((res) => {
            alert("条件の保存に失敗しました。");
            console.log(res);
          }).finally(() => {
            this.is_show_spinner = 0;
          })
      }
    },
    delete_conditions() {
      if (this.delete_keys.length == 0) {
        alert("一件も選択されていません。");
        return null;
      }

      if (window.confirm("チェックした物件条件を削除してもよろしいですか?")) {

        let params = {
          'key': this.delete_keys
        };

        this.is_show_spinner = 1;
        pc.delete(params)
          .then((res) => {
            if (res['data']['res'] !== undefined && res['data']['res'] == true) {

              this.product_conditions = Sugar.Array(this.product_conditions).exclude((v) => {
                return (this.delete_keys.indexOf(v.key) >= 0);
              }).raw

              this.filter_product_conditions =
                Sugar.Array(this.filter_product_conditions).exclude((v) => {
                  return (this.delete_keys.indexOf(v.key) >= 0);
                }).raw

              this.delete_keys = [];

              alert("削除に成功しました。");
            }
          }).catch((res) => {
            alert("条件の削除に失敗しました。");
            console.log(res);
          }).finally(() => {
            this.is_show_spinner = 0;
          })
      }
    },
    close_product_modal() {
      this.$modal.hide('product_conditions');
    },
    number_format(str = '') {
      let sugarStr = new Sugar.String(str);
      return sugarStr.toNumber().format();
    },
    edit_product_row(product = {}, index = '') {
      this.is_show_list = 0;
      this.is_show_edit = 1;
      this.single_product = product;
      if (index !== '') {
        this.single_product.index = index + 1;
      } else {
        this.single_product.index = '';
      }
      this.product_err = '';
      this.price_err = '';
    },
    back_to_list() {
      this.single_product = {};
      this.is_show_list = 1;
      this.is_show_edit = 0;
    },
    between_price(product = {}) {
      let from = (product.price_min !== null && product.price_min !== undefined) ? `${product.price_min}円` : '';
      let to = (product.price_max !== null && product.price_max !== undefined) ? `${product.price_max}円` : '';

      let price_str = `${from} 〜 ${to}`;
      return price_str;
    }
  },

  created() {
    //モーダルの見えた時とは違うので注意
  },
  data() {
    return {
      is_show_spinner: 0,
      filter_product_conditions: [],
      delete_keys: [],
      records: [],
      is_show_list: 0,
      is_show_edit: 0,
      single_product: {},
      product_err: '',
      price_err: '',
      master_lists: []
    }
  }
}
</script>
<style>
.modal_wrapper {
  position: relative;
}

.spininng_back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.inner_wrapper {
  margin: 10px;
}

.button_wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.area_block {
  margin-left: 5px;
  overflow-y: scroll;
  height: 250px;
}

</style>
