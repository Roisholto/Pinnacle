import Dexie from 'dexie'
import TableStructures from '@/class.db_structures.js'
import { uniqBy } from 'lodash'
import moment from 'moment'
import loop_and_delete from '@/functions/loop_and_delete'
// import Core
const user = {
  namespaced: true,
  state: {
    signedin: false,
    saved_locations: [], // location in radians{coords:{lat,lng}, full_address:"", tag:''}
    saved_stores: [],
    pref: {},
    transactions: [],
    orders: [],
    info: {},
    session_token: null,
    // the current location of the user
    currentLocation: {
      id: null, // the watchID
      coords: {} // the current position
    },
    // distances to outlets.
    distance_calcs:{} //"from-to":"distance".
  },

  mutations: {
    set_session_token: function (state, token) {
      state.session_token = token
    },
    add_transactions: function (state, trx) {
      //
      let uniq = _.uniqBy([].concat(trx, state.transactions), 'ref')
      state.transactions = uniq
    },
    add_orders: function (state, orders) {
      let uniq = _.uniqBy([].concat(orders, state.orders), 'inv_id')
      console.log()
      state.orders = uniq
    },
    add_saved_stores: function (state, stores) {
      let a = []
      a.push(...state.saved_stores)
      a.push(...stores)
      let uniq = _.uniqBy(a, 'mid')
      state.saved_stores = uniq
    },
    remove_saved_stores: function (state, stores) {
      // stores is an arry of mid's to remove ;
      let b = loop_and_delete(state.saved_stores, stores, 'mid')
      state.saved_stores = b
    },
    update_current_location_coords: function (state, loc) {
      // loc is the
      state.currentLocation.coords = loc
    },
    update_current_location_id: function (state, id) {
      // loc is the
      state.currentLocation.id = id
    },
    add_calculated_distance:function(state, payload){
        // payload is expected to be an object.
        Object.assign(state.distance_calcs, payload) ;
    },

    add_saved_locations:function(state, payload){
        state.saved_locations = payload ;
    },

    push_saved_locations:function(state, payload){
        if(state.saved_locations.locations)
            state.saved_locations.locations.push(payload) ;
        else
            {
            state.saved_locations = {locations:[payload]}
            }
    }
  },

  actions: {
    // create indexdb and return ;dexie object
    init_data_store: function (ctx, payload) {
        let tbStructures = new TableStructures()
        const vm = this
        let uid = ctx.getters.isSessionActive ? ctx.getters.parseSessionToken['uid'] :  ''

        // user database creation
        let db_user = new Dexie('shopper_' + uid)
        db_user.version(1).stores(tbStructures.shopper)
        db_user.version(2).stores(tbStructures.shopper).upgrade(function(tx){
            console.log('tx', tx)
            tx.payment.each(function(v){
                tx.orders.where({inv_id:v.invoice.invoice})
                    .modify({payment_ref:v.ref,payment_status:'success'})
                    .then(function(v){
                        console.log('update item', v)
                    })
                .catch(function(e){
                    console.log('error checking tranactions', e);
                })
                .catch(function(e){
                    console.log( 'error with versionsing', e) ;
                })
            })

        })

        console.log('db version', db_user.verno)

        return db_user

        // Core.db_user = db_user ;
        }
    },

  getters: {
    // check if the user token is still usable
    getSessionToken: function (state) {
      return localStorage.getItem('token') //  ; // data here may be stale, state.session_token,
    },
    parseSessionToken: function (state, getters) {
      let token = getters.getSessionToken // data here may be stale, ,
      if (token) {
        token = token.split('.')
        token = JSON.parse(atob(token[1]))
        return token.asa == 'shopper' ? token : null
      }

      return null
    },
    isSessionActive: function (state, getters) {
      let token = getters.parseSessionToken
      if (token) {
        let exp = parseInt(token.exp)
        let now = moment().format('X')
        if (exp > now) { return true }

        return false
      }

      return null
    },
    prepAuthorization: function (state, getters) {
      return {
        Authorization: getters.getSessionToken || '',
        'Content-Type': 'Application/json'
      }
    },
    getDistanceCalc:(state) => (prop)=>{
      return state.distance_calcs[prop]
  } ,
  initDataBase: function (state, getters) {
      let tbStructures = new TableStructures()
      const vm = this
      let uid = getters.isSessionActive ? getters.parseSessionToken['uid'] :  ''

      // user database creation
      let db_user = new Dexie('shopper_' + uid)
      db_user.version(1).stores(tbStructures.shopper)
      db_user.version(2).stores(tbStructures.shopper).upgrade(function(tx){
          tx.payment.each(function(v){
              tx.orders.where({inv_id:v.invoice.invoice})
                  .modify({payment_ref:v.ref,payment_status:'success'})
                  .then(function(v){
                      console.log('update item', v)
                  })
              .catch(function(e){
                  console.log('error checking transactions', e);
              })
          })
          .catch(function(e){
              console.log( 'error with versionsing', e) ;
          })
      })
     return db_user
      // Core.db_user = db_user ;
      }

  }
}

export default user
