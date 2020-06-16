import Vue from 'vue';
import Vuex from 'vuex';
import product_conditions from './product_conditions.js'

Vue.use(Vuex);

const module = {
    modules:{
      product_conditions
    }
}

export default new Vuex.Store(module);
