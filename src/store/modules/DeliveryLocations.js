import {API_ENDPOINT} from '@/constants.js' ;
import Core from '@/class.core.js' ;

const DeliveryLocations = {
  namespaced:true,
  state:{
    locations:[],
    request:{
      sending:false,
      error:null // becomes an object
    }
  },

  mutations:{
    setLocations(state, payload){
      //payload is expected to be an array of locations ;
      state.locations = payload ;
    },

    switchRequesting(state,payload){
      state.requesting = Object.assign({}, state.requesting, payload) ;
    }
  },

  actions:{
    fetchLocations({commit}){
      let url = `${API_ENDPOINT}/delivery/location/shopper/${Core.merchant}` ;
      commit('switchRequesting', {sending:true})
      fetch(url)
        .then((r)=>r.json())
        .then(r=>{
          if(r.succ)
            {
            commit('setLocations', r.data.locations) ;
            }
          else
            {
            commit('switchRequesting', {sending:false, error:r}) ;
            }
        })
        .finally(()=>{
          commit('switchRequesting', {sending:false})
        })
    }
  },

  getters:{

  }
}

export default DeliveryLocations ;
