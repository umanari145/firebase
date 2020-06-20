<template>
  <div>
    <div class="wrapper centering" style="width:40%;">
        <Header></Header>
        <div class="centering" v-if="is_login">
          <div class="centering t_c"
          style="margin-top:20px;"
          @click="bootModal('settings')">
              ユーザー管理
          </div>
          <div class="centering t_c"
          style="margin-top:20px;"
          @click="bootModal('product_conditions')">
              商品条件({{product_conditions.length}})
          </div>
          <div class="centering t_c"
          style="margin-top:20px;">
            成績
          </div>

        </div>
      <Settings/>
      <Conditions/>
    </div>
    <div v-if="is_loading">
      <Loading></Loading>
    </div>
  </div>
</template>
<script>

import product_conditions from '../api/product_conditions.js';
//import master_list from '../api/master_list.js';
import Conditions from './Conditions.vue';
import Settings from './Settings.vue';
import Header from './Layout/Header.vue';
import Loading from './Parts/Loading.vue';

export default {
  name: 'Main',
  components: {
    Conditions,
    Header,
    Settings,
    Loading
  },
  data() {
    return {
      is_loading:null
    }
  },
  methods:{
    save_settings() {

    },
    bootModal(modal_name) {
      this.$modal.show(modal_name);
    }
  },
  computed:{
      product_conditions: {
        get() {
            return this.$store.getters["product_conditions/get_product_conditions"];
        }
      },
      is_login: {
        get() {
          return this.$store.getters["settings/is_login"];
        }
      },
      user: {
        get() {
          return this.$store.getters["settings/get_user"];
        }
      }
  },
  mounted() {
      const pc = new product_conditions();
      //const master = new master_list();
      this.is_loading = true;
      Promise.all([
        pc.read()
      ])
      .then((res) => {
        if (res[0]['data'] !== undefined && res[0]['data']['res'] == true) {
          let product_conditions = res[0]['data']['data'];
          this.$store.commit("product_conditions/set_product_conditions", product_conditions);
        }
      })
      .catch((res) => {
        alert("読み込みに失敗しました。");
        console.log(res);
      })
      .finally((res) => {
        this.is_loading = false;
        console.log(res);
      });
  },
  created() {

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
