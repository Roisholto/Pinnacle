const cartExtras = {
  namespaced: true,
  state: {
    user_info:{
        email:'',
        tel:'',
        name:''
    },
    promotion:{
      coupon:null
    },
    preorder: {
      is_preorder: false,
      vars:{
        date:'',
        time:''
      },
      time: 0
    },
    delivery: {
      is_delivery: false,
      info: {
        name: '',
        phone: '',
        location: {
          coords: {},
          address: ''
        }
      },
      quotation: {
      }
    }
  },
  mutations: {
    update_is_delivery: function (state, x) {
      state.delivery.is_delivery = x
    },

    update_is_preorder: function (state, x) {
      state.preorder.is_preorder = x
    },

    update_preorder_time: function (state, x) {
      state.preorder.time = x
    },

    update_delivery_info: function (state, v) {
      state.delivery.info = Object.assign(state.delivery.info, v)
    },

    update_quotation: function (state, v) {
      state.delivery.quotation = v
    },

    update_user_info:function(state, v){
        state.user_info = Object.assign(state.user_info, v) ;
    },

    update_preorder_var_time(state,v) {
        state.preorder.vars.time = v ;
    },

    update_preorder_var_date(state,v){
        state.preorder.vars.date = v ;
    },

    set_promo_code(state, v){
      //v is expected to be a string or number ;
      state.promotion.coupon = v ;
    }

  },
  getters: {
    // this will onlly be called if user chooses option for home delivery
    isDeliveryQuotationOkay: function (state, getters) {
      // should return true or false ;
      if (state.delivery.quotation.error || Object.keys(state.delivery.quotation).length == 0) { return false } else {
        return state.delivery.quotation.data
      }
    },

    getQuotation: function (state, getters) {
      return state.delivery.quotation
    },
    getPreorderTime: function(state, getters){
        return state.preorder.vars.date+' '+state.preorder.vars.time ;
    }
  }
}
export default cartExtras
