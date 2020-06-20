import Vue from 'vue';
import Vuex from 'vuex';
import product_conditions from './product_conditions.js'
import master_list from './master_list.js';
import settings from './settings.js';
import loading from './loading.js';

Vue.use(Vuex);

const module = {
    modules:{
      product_conditions,
      settings,
      master_list,
      loading
    }
}

export default new Vuex.Store(module);
