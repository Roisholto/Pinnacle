import Vue from 'vue'
import cartExtras from './cartExtras.js'
import pageComponents from './pageComponents.js' ;

const merchant = {
  // data store for the current merchant
  namespaced: true,
  state: {
    search: {
      search_text: '',
      record: {}, // info about the search query result
      items: []
    },
    info:
            {
              mid: '',
              logo: '',
              addr: '',
              loc: '',
              type: ''
            },
    cart: [{ name: 'pack1', status: 'open', items: [] } ], //  [ {name:"pack1", status:"open", items:[{iteminfo1}],... }, {name:"pack1", status:"open", items:[{iteminfo1}],... } ]
    inventory:
            {
              categorys: [],
              subLists: {
                'top_list': {},
                'all': []
              },
              items: {},
              record: {}
            },

    pref: {}
  },
  modules: {
    cartExtras: cartExtras,
    pageComponents:pageComponents
  },
  /************************************************/
  mutations: {
    init_store: function (state, payload) {
        state.info = payload.info
        state.pref = payload.settings
        state.inventory = {
            items: {},
            categorys: [],
            record: {},
            subLists: {
                'top_list': {},
                'all': []
                }
            }

        state.search = {
            search_text: '',
            record: {}, // info about the search query result
            items: []
            }

        // empty the cart
        state.cart = [{ name: 'pack1', status: 'open', items: [] }]
        },

    add_item_to_inventory: function (state, payload) {
      // expecting payload as an object or array ;
      if (Array.isArray(payload)) {
        let entry
        for (let i = 0; i < payload.length; i++) {
          entry = payload[i]
          Vue.set(state.inventory.items, entry.code, entry)
        }
      } else// its an object
      {
        console.log('payload is not an array')
        state.inventory.items[payload.code] = payload
      }
    },
    delete_item_from_inventory: function (state, payload) {
      // payload is an array of item ids or codes ;
      let the_keys = Object.keys(state.inventory.items)
      payload.forEach(function (id) {
        for (let i = 0; i < the_keys.length; i++) {
          if (the_keys[i] == id) {
            delete state.inventory.items[id] // Vue.delete
            break
          }
        }
      })
    },
    overwrite_categorys: function (state, payload) {
      state.inventory.categorys = payload
    },
    insert_categorys: function (state, payload) {
      // expecting an arry of categorys to insert ;
      let this_categorys = state.inventory.categorys
      let new_cate = []
      let found

      for (let i = 0; i < payload.length; i++) {
        found = false
        for (let j = 0; j < this_categorys.length; j++) {
          console.log('checking insert category', this_categorys[j].id, payload[i].id)
          if (this_categorys[j].id == payload[i].id) {
            found = true
            this_categorys[j] = payload[i] // Object.assign
            break
          }
        }

        if (!found) { this_categorys.push(payload[i]) }
      }

      // state.inventory.categorys = this_categorys ;
    },
    delete_categorys: function (state, payload) {
      let this_cats = state.inventory.categorys
      // payload is expected to be an array of the category ids
      for (let i = 0; i < payload.length; i++) {
        for (let j = 0; j < this_cats.length; i++) {
          if (payload[i] == this_cats[j].id) {
            this_cats.splice(j, 1)
          }
        }
      }

      state.inventory.categorys = this_cats
    },
    insert_top_list: function (state, payload) {
      state.inventory.subLists.top_list = payload
    },
    update_search: function (state, payload) {
      state.search.search_text = payload
    },
    overwrite_cart: function (state, payload) {
      state.cart = payload
    },
    add_cart_pack: function (state, packname) {
      state.cart.push({ name: packname.toString(), status: 'open', items: [] })
    },
    empty_cart:function(state){
        state.cart = [{ name: 'pack1', status: 'open', items: [] }]
    }

  },
  /************************************************/
  actions: {
    update_search_string: function (ctx, payload) {
      ctx.commit('update_search', payload)
    },
    add_inventory_items: function (ctx, payload) {
      ctx.commit('add_item_to_inventory', payload)
    },
    delete_inventory_items: function (ctx, payload) {
      ctx.commit('delete_item_from_inventory', payload)
    },
    overwrite_cart: function (ctx, payload) {
      ctx.commit('overwrite_cart', payload)
    },
    /* remove_item_from_cart:function(state,payload)
            {

            }, */
    remove_item_from_cart_items: function ({ commit, state }, payload) {
      // should put this in mutations ;
      // payload is an  array of [main_index, sub_index]
      state.cart[payload[0]].items.splice(payload[1], 1)
    }
  },
  /************************************************/
  getters: {
    getStateProp: (state) => (prop) => {
      return state[prop]
    },
    inventoryItems: (state) => (code) => {
      if (code) { return state.merchant.inventory.items[code] }

      return state.mercant.inventory.items
    },
    cart_packs: (state) => {
      let ct = []
      console.log('the packs ', state.cart)
      state.cart.forEach(function (v) {
        ct.push(v.name)
      })

      return ct
    },
    cart_length: (state) => {
      let cart = state.cart
      let total_items = 0
      cart.forEach(function (c) {
        total_items += c.items.length
      })

      return total_items
    },
    // get a particular item on cart
    /**
        * @param  drx @type = Array [0,1]
        */
    cart_item: (state) => (drx) => {
      // console.log('drx', drx)
      // add the pack
      return Object.assign({ selected_pack: state.cart[drx[0]].name }, state.cart[drx[0]].items[drx[1]])
    }
  }
}

export default merchant
