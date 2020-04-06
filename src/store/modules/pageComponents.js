const pageComponents = {
  namespaced:true,

  state:{
    image_sliders:{},
    page_groups:{}
  },

  mutations:{
    add_slider(state,prop){
      // prop is expected to be an object ;
      // must contain a name .
      if(typeof prop == 'object')
        state.image_sliders[prop.name] = prop ;
    },

    add_page_group(state, prop){
      state.page_groups[prop.name] = prop ;
    }
  },

  getters:{

    getImageSlider: (state) => (prop) => {
      return state.image_sliders[prop]
    },

    getPageGroup: (state)=>(prop)=>{
      return state.page_groups[prop]
    }
  }
}

export default pageComponents ;
