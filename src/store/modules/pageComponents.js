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
    }
  },

  getters:{

    getImageSlider: (state) => (prop) => {
      return state.image_sliders[prop]
    },

  }
}

export default pageComponents ;
