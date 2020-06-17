import Vue from 'vue';
import Vuex from 'vuex';
import product_conditions from './product_conditions.js'
import user from './user.js';
import loading from './loading.js';

Vue.use(Vuex);

const module = {
    modules:{
      product_conditions,
      user,
      loading
    }
}

export default new Vuex.Store(module);
