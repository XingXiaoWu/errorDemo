import Vue from 'vue'
import App from './App.vue'
import * as errorNotify from 'vue-error-notify'

Vue.config.productionTip = false
errorNotify.init("demo",Vue);
new Vue({
  render: h => h(App),
}).$mount('#app')
