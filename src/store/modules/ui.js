import {INSTALL_MODE} from '@/constants.js' ;

const ui = {
  namespaced: true,
  state: {
    installMode: INSTALL_MODE,
    showStoreInfo: true,
    showStoreFooter: true,
    storeInfoHeight: 80, // set 80 as default ;
    appHeaderHeight: 60, // default ;
    storeFooterHeight: 0,
    StoreDefault:{
      // number of times the opening modal was opened
      openingModalCount:0
    },
    userLayout:{
        showExtension:true,
        isPrev:false,
    }
  },
  mutations: {
    update_info: (state, payload) => {
      // payload is an array of two elems ['key to update', value to set] ;
      state[payload[0]] = payload[1]
    },

    incrementOpeningModalCount:(state)=>{
      state.StoreDefault.openingModalCount++
    }
  },

  getters: {
    heights: (state) => (key, useUnit = true) => {
      // key has to be one of the keys with suffix Height
      let height = useUnit ? state[key].toString() + 'px' : state[key]
      return height
    },
    // TODO move this to the rootstate
    homeLink(state, getters, rootState, rootGetter){
        return INSTALL_MODE == 'standard' ? {path:'/'} : {name:'store', params:{storeid: rootState.standalone.mid}}
    }
  }
}

export default ui
