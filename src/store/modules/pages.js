import Core from '@/class.core.js' ;
import {API_ENDPOINT} from '@/constants.js' ;

const pages = {
  namespaced:true,

  state:{
    pages:{}
  },

  mutations:{
    add_page(state, prop){
      if(Array.isArray(prop))
        {
        prop.forEach(function(x){
          state.page[x.title] = x ;
        })
        }
      else
        {
        if(prop.title)
          state.pages[prop.title] = prop ;
        }

    },

    update_page(state, prop){
      state.page = Object.assign({}, prop) ;
    }
  },

  actions:{
    fetch_page:({commit}, name)=>{
      // name is page-name or page-id ;
      let url = `${API_ENDPOINT}/pages/shopper/${Core.merchant}/${name}`
      fetch(url)
        .then(function(r){
          return r.json()
        })
        .then(function(r){
          if(r.succ)
            {
            // very likely this response changes ;
            if(Array.isArray(r.data))
              {
              commit('add_page', r.data)  ;
              }
            else
              {
              let ks = Object.keys(r.data) ;
              if(ks.indexOf('page') == -1 || ks.indexOf('pages') == -1)
                {
                let a = ks.indexOf('page') ? 'page' : 'pages' ;
                commit('add_page', r.data[a])
                }
              else
                {
                commit('add_page', r.data) ;
                }
              }
            }
        })
        .catch(function(e){

        })

    }
  },

  getters:{
    getPage: (state)=>(prop)=>{
      console.log('get page ', prop, state) ;
      return state.pages[prop]
    }
  }
}

export default pages ;
