const page = {
  state:{
    page:{}
  },

  mutations:{
    update_page(state, prop){
      state.page = Object.assign({}, prop) ;
    }
  }
}

export default page ;
