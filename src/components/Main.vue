<template>
  <div>
    <div class="wrapper centering">
        <Header></Header>
        <div class="centering" v-if="is_login">
          <div class="centering t_c btn btn-info"
          style="margin-top:20px;"
          @click="bootModal('settings')">
              ユーザー管理
          </div>
          <div class="centering t_c btn btn-primary"
          style="margin-top:20px;"
          @click="bootModal('product_conditions')">
              商品条件({{product_conditions.length}})
          </div>

          <Score></Score>
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
import master_list from '../api/master_list.js';
import settings from '../api/settings.js';
import score from '../api/score.js';

import Conditions from './Conditions.vue';
import Settings from './Settings.vue';
import Score from './Score.vue';
import Header from './Layout/Header.vue';
import Loading from './Parts/Loading.vue';

export default {
  name: 'Main',
  components: {
    Conditions,
    Header,
    Settings,
    Score,
    Loading
  },
  data() {
    return {
      is_loading:null,
      score:[]
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
      master_list: {
        get() {
          return this.$store.getters["master_list/get_master_list"];
        }
      },
      user: {
        get() {
          return this.$store.getters["settings/get_user"];
        }
      }
  },
  mounted() {

  },
  created() {

    const pc = new product_conditions();
    const master = new master_list();
    const settings_api = new settings();
    const score_api = new score();

    this.is_loading = true;
    Promise.all([
      pc.read(),
      master.read(),
      settings_api.read(),
      score_api.read()
    ])
    .then((res) => {
      if (res[0]['data'] !== undefined && res[0]['data']['res'] == true) {
        let product_conditions = res[0]['data']['data'];
        this.$store.commit("product_conditions/set_product_conditions", product_conditions);
      }
      if (res[1]['data'] !== undefined && res[1]['data']['res'] == true) {
        let master_list = res[1]['data']['data'];
        for(var i = 0; i < master_list['interval'].length; i++) {
          let val = master_list['interval'][i];
          master_list['interval'][val] = val;
        }
        this.$store.commit("master_list/set_master_list", master_list);
      }

      if(res[2]['data']['res'] == true && res[2]['data']['data'] !== undefined) {
        if (res[2]['data']['data'].length > 0) {
          let accounts = res[2]['data']['data'];
          this.$store.commit("settings/set_accounts", accounts);
        }
      }

      if(res[3]['data']['res'] == true && res[3]['data']['data'] !== undefined) {
        if (res[3]['data']['data'].length > 0) {
          this.score = res[3]['data']['data'];
        }
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
