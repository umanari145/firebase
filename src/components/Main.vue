<template>
  <div>
    <div class="wrapper centering">
        <Header></Header>
        <div v-if="is_login" class="inner_centering" style="margin-top:10px;"
        @click="bootModal('product_conditions')">
            商品条件({{product_conditions.length}})
        </div>
      <Conditions/>
    </div>
    <div v-if="is_loading">
      <Loading></Loading>
    </div>
  </div>
</template>
<script>

import product_conditions from '../api/product_conditions.js';
import Conditions from './Conditions.vue';
import Header from './Layout/Header.vue';
import Loading from './Parts/Loading.vue';

export default {
  name: 'Main',
  components: {
    Conditions,
    Header,
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
          return this.$store.getters["user/is_login"];
        }
      },
      user: {
        get() {
          return this.$store.getters["user/get_user"];
        }
      }
  },
  mounted() {
      const pc = new product_conditions();
      this.is_loading = true;
      pc.read_conditions()
      .then((res) => {
        if (res['data'] !== undefined && res['data']['res'] == true) {
          let product_conditions = res['data']['data'];
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
      })
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
