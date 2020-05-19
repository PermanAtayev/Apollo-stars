import Vue from 'vue'
import App from './App.vue'
import index from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  router: index,
  vuetify,
  render: h => h(App)
}).$mount('#app')
