import Vue from 'vue'
import App from './App.vue'
import { io } from 'socket.io-client'
import CarbonComponentsVue from '@carbon/vue'

Vue.use(CarbonComponentsVue)

Vue.config.productionTip = false

Vue.prototype.$socket = process.env.NODE_ENV === 'production' ? io() : io('http://localhost:3000')

new Vue({
  render: (h) => h(App)
}).$mount('#app')
