import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
// import router from './router'
// import store from './store'
import 'common/stylus/index.styl'
import './register'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
