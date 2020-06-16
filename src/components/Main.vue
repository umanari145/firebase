<template>
  <div class="wrapper centering">
      <h1 class="title">
          ツールリスト
      </h1>
      <div id="front" class="centering inner_centering" style="width:80%;" v-cloak>
          <div>
              <table class="form">
                  <tr>
                      <th>メールアドレス</th>
                      <td><input type="text" required v-model="settings.email"/></td>
                  </tr>
                  <tr>
                      <th>パスワード</th>
                      <td><input type="password" required v-model="settings.password"></td>
                  </tr>
              </table>
              <div style="text-align:center;">
                  <button @click="save_settings">設定保存</button>
              </div>
              <div @click="bootModal('product_conditions')">
                  商品条件
              </div>
          </div>
      </div>
    <Conditions/>
  </div>
</template>
<script>

import product_conditions from '../api/product_conditions.js';
import Conditions from './Conditions.vue';

const pc = new product_conditions();

export default {
  name: 'Main',
  components: {
    Conditions
  },
  data() {
     return {
       settings:[]
    }
  },
  methods:{
    save_settings() {
        console.log('aaaa');
    },
    bootModal(modal_name) {
      this.$modal.show(modal_name);
    },

  },
  computed:{
      product_conditions: {
        get() {
            return this.$store.getters["product_conditions/get_product_conditions"];
        }
      }
  },
  mounted() {
    Promise.all([
      pc.read_conditions()
      ])
      .then((res) => {
        if (res[0] !== undefined) {
          let product_conditions = res[0]['product_conditions'];
          this.$store.commit("product_conditions/set_product_conditions", product_conditions);
        }
/*        if (res[1] !== undefined) {
          this.product_conditions = res[1];
        }
        if (res[2] !== undefined) {
          this.records = res[2];
        }*/
      })
      .catch((res) => {
        alert("読み込みに失敗しました。");
        console.log(res);
      })
      .finally((res) => {
        console.log('--finally--');
        console.log(res);
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}

.centering{
    margin-right: auto;
    margin-left: auto;
}

.inner_centering{
    display: flex;
    justify-content: center;
}

.wrapper{
    width: 80%;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
