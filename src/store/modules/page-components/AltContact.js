export default {
  namespaced: true ,
  state:{
    contact:{
      mail:[],
      phone:[],
      address:[]
    },
    fetchResult:{},
    fetching:false,
  },

  mutations:{
    set_result(state, prop){
      state.fetchResult = Object.assign({}, prop) ;
      if(prop.data.alt_contact)
        state.contact = Object.assign({}, state.contact, prop.data.alt_contact) ;
    },

    delete_contact(state){
      state.fetchResult = {} ;
      state.contact = {mail:[], phone:[], address:[]} ;
    }
  },

  actions:{

  },

  getters:{
    action(state){
      let x = state.fetchResult.data ? state.fetchResult.data : {} ;
      return Object.keys(x).length ? 'update' : 'create'
    },

    get_contact(state){
      return state.contact ;
    }
  }
}
