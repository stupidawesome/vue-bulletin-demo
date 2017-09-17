// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/App/App.vue'
import router from './router'
import FormGroup from '@/components/FormGroup/FormGroup'
import Post from '@/components/Post/Post'
import Paginator from '@/components/Paginator/Paginator'

Vue.config.productionTip = false
Vue.component('FormGroup', FormGroup)
Vue.component('Post', Post)
Vue.component('Paginator', Paginator)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

