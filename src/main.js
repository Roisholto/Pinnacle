/* eslint-disable */
import './assets/scss/preloader.scss' ;
// import './assets/scss/loaders/_loaders.scss' ;
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './registerServiceWorker'
import jquery from 'jquery'
import "./assets/css/shopper.css"
// jbox
import "jbox/Source/jBox.css" ;
import "jbox/Source/plugins/Notice/jBox.Notice.css" ;
// import "jbox/Source/themes/TooltipDark.css" ;
// import "jbox/Source/themes/TooltipSmall.css" ;
import singleItem from './components/common/item/single-item.vue' ;
import Core from './class.core.js' ;
Core.Authorization = localStorage.getItem('token') ;

import jBox from 'jbox' ;
import vuetify from './plugins/vuetify';
window.jBox = jBox ;

let google = window.google ;
// put jQuery in window
// window.jQuery = jquery ;

Vue.config.productionTip = false
const app = new Vue({
  store,
  router,
  // debug:true,
  vuetify,
  render: h => h(App)
}).$mount('#app') ;
