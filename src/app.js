import Vue from 'vue'
import App from './App.vue';
import VModal from 'vue-js-modal';
import BootstrapVue from 'bootstrap-vue';

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(VModal);

new Vue({
  render: h => h(App),
}).$mount('#app')
