// stores outlets ;
const outlets = {
    namespaced:true,
    state:{
        items:{

        }
    },
    mutations:{
        add_item:function(state, prop){
            if(Array.isArray(prop))
                {
                
                }
            state.items = Object.assign(state.items, prop) ;
            }
    },
    getters:{
        getOutlet:(state)=>(outlet)=>{
            return state.items[outlet]
        }
    }
}

export default outlets ;
