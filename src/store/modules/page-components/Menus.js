const Menus = {
  namespaced: true,

  state:{
    product_category:[]
  },

  mutations:{
    add_product_category(state, payload){
      state.product_category = Array.from(payload) ;
    },
  },

  getters:{

  }
}

export default Menus ;
