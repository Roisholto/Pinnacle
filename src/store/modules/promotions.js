import uniqBy from 'lodash' ;

const Promotions = {
  namespaced: true,

  state:{
    promos:[]
  },

  mutations:{
    ADD_PROMO(state, payload){
      // payload is an array of promotions ;
      let a = Array.from(state.promos) ;
      a.push(...payload) ;
      a = _.uniqBy(a, 'uuid') ;
      a.sort(function(x,y){
          return x.priority - y.priority
        }) ;
      state.promos = a ;
    }
  },

  getters:{
    // get the promos that a product qualifies for ;
    qualifyingPromos:(state, rootState)=>(code)=>{
      let promos = state.promos ;
      // the promos item qualified for ;
      let q = [] ;
      for(let i=0; i<promos.length; i++){
        let promo = promos[i] ;
        if(promo.type == 'product'){
          if(promo.discount_params.items.indexOf('*') != -1 || promo.discount_params.items.indexOf(code) !=-1){
            q.push(promo) ;
          }
        }
      }
      return q ;
    }
  }
}

export default Promotions ;
