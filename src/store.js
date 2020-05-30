import Vue from 'vue'
import Vuex from 'vuex'
import mainSearch from './store/modules/mainSearch.js'
import user from './store/modules/user.js'
import merchant from './store/modules/merchant.js'
import ui from './store/modules/ui.js'
import { AUTH_URL, INSTALL_MODE } from '@/constants.js'
import outlets from './store/modules/outlets.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    search: mainSearch,
    merchant: merchant,
    user: user,
    ui: ui,
    outlets:outlets,
    standalone:{
        fetched_once:false
    }
  },

  state: {

  },
  mutations: {
      set_standalone(state, payload){
          // expected to call this only once during the app lifecycle
          state.standalone = Object.assign(state.standalone, payload, {fetched_once:true}) ;
      }
  },
  actions: {

  },
  getters: {
    authUrl: function () {
      return AUTH_URL
      },

    pageLinks:(state, getters, rootState, rootGetter)=>()=>{
      let a = {} ;
      let home = INSTALL_MODE == 'standard' ? {path:'/'} : {name:'store', params:{storeid: state.merchant.info.mid}}
      a.home = home

      let merchant_contact = {name:'merchant-contact', params:{storeid: state.merchant.info.mid}}
        

      a.merchant_contact = merchant_contact ;

      // console.log('a', a) ;

      return a ;
      }
  }
})
