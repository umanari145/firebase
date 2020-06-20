<template>
  <div class="modal_wrapper">
    <modal name="settings"
    :width="1200"
    :height="550"
    >
    <div class="spininng_back" v-if="is_show_spinner == 1">
        <b-spinner label="Spinning" type="grow">
        </b-spinner>
    </div>
    <div class="modal_wrapper">
        <div class="modal_title">自動予約Webツール - ユーザー管理条件</div>
            <div class="t_r" style="width:95%;">
                <button v-on:click="close_account_modal">閉じる</button>
            </div>
            <div class="table_wrapper">
                <table>
                    <thead>
                        <tr style="background:#E3E3E3;">
                          <th class="col_10 tr_c">No</th>
                          <th class="col_20 tr_c">メールアドレス</th>
                          <th class="col_20 tr_c">パスワード</th>
                          <th class="col_10 tr_c">ON/OFF</th>
                          <th class="col_15 tr_c">実行モード</th>
                          <th class="col_10 tr_c">間隔</th>
                          <th class="col_10 tr_c"></th>
                        </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(each_account, account_index) in accounts"
                      :key="account_index">
                        <td class="tr_c">
                          {{account_index + 1}}
                        </td>
                        <td class="tr_c">
                          {{accounts[account_index]['email']}}
                        </td>
                        <td class="tr_c">
                          ****************
                        </td>
                        <td class="tr_c">
                          <input
                          type="checkbox"
                          v-model="accounts[account_index]['is_on']"
                          value="1"
                          :id="'is_on_' + account_index"
                          >
                          <label :for="'is_on_' + account_index">ON</label>
                        </td>
                        <td class="tr_c">
                          <Select
                            :value.sync="accounts[account_index]['mode']"
                            :kv_list="master_list.mode"
                          >
                          </Select>
                        </td>
                        <td class="tr_c">
                          <Select
                            :value.sync="accounts[account_index]['interval']"
                            :kv_list="master_list.interval"
                          >
                          </Select>
                        </td>
                        <td>
                          <button style="margin-right:15px;"
                          @click="save_accounts(account_index)">
                          保存
                          </button>
                        </td>
                      </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </modal>
  </div>
</template>
<script>

import Select from './Forms/Select';
import settings from '../api/settings.js';

const settings_api = new settings();

export default {
    components:{
      Select
    },
    computed:{
      accounts: {
        get() {
            return this.$store.getters["settings/get_accounts"];
        },
        set(val) {
          this.$store.commit("settings/set_accounts", val);
        }
      },
      master_list: {
        get() {
            return this.$store.getters["master_list/get_master_list"];
        }
      }
    },
    methods:{
      save_accounts(account_index) {
        if(window.confirm("この条件を保存しますか?")) {
          this.is_show_spinner = 1;
          let params;
          params = this.accounts[account_index];
          settings_api.save({
            'accounts':params,
            'key':params['key']
          }, 'accounts')
          .then((res) => {
              if (res['data']['res'] !== undefined &&res['data']['res'] == true) {
                alert("保存に成功しました。");
              }
          }).catch((res) => {
            alert("アカウントの保存に失敗しました。");
            console.log(res);
          }).finally(() => {
            this.is_show_spinner = 0;
          })
        }
      },
      close_account_modal(){
        this.$modal.hide('settings');
      }
    },
    created() {
        //モーダルの見えた時とは違うので注意
    },
    mounted() {
    },
    data(){
        return {
          is_show_spinner:0,
          product_err:'',
          price_err:'',
          master_lists: []
        }
    }
}
</script>
<style>

.modal_wrapper{
  position: relative;
}

.spininng_back{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.inner_wrapper{
    margin: 10px;
}

.button_wrapper{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.area_block{
    margin-left: 5px;
    overflow-y: scroll;
    height: 250px;
}
</style>
