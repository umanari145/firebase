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

import Conditions from './Conditions.vue';

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
    }
  },
  mounted() {

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
