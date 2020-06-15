import Core from './class.core.js'
import { API_ENDPOINT } from './constants.js'
import isEqual from 'lodash'
export const identity = {}

export async function fetch_item_from_api (storeid, val = []) {
  let clause
  if (Array.isArray(val)) {
    clause = val
  } else { clause = [] }

  let url = API_ENDPOINT + '/inventory/shopper/' + storeid + '?array&clause=' + encodeURIComponent(JSON.stringify(clause))
  return fetch(url)
    .then(resp => { return resp.json() })
    .then(json => {
      if (!('error' in json)) {
        let the_code
        json.inventory.forEach(function (v) {
          v.rate = Core.parse_rate(v.rate)
        })

        // update the inventory list ;
        update_inventory_db(Core.set_db_id('code', json.inventory))
      }
      return json
      // vm.merchant.search.items = rs ;
    })
    .catch(e => { console.log(e) })
}

export function load_inventory () {
  return Core.db_merchant.inventory.toCollection().toArray(function (inventory) {
    // console.log( 'inv ' ,inventory)
    if (inventory.length == 0) {
      // probably the user is signing in for the first time and not record exists yet
      // load the data from server ;
      // console.log(identity) ;
      fetch_item_from_api(Core.merchant)
      // return [];
    } else {
      // fetching from db ;
      // console.log('fetching from db ');
      // the data here is more or less stale,
      // does not trigger any modification
      // sync_inventory() ; p
      return inventory
    }
  })
    .catch(e => console.log('load error', e))
}

// method to load category from indexdb ;
export function load_category () {
  return Core.db_merchant.category.toCollection().toArray(function (categorys) {
    if (categorys.length == 0) {
      // check the api
    } else {
      return categorys
    }
  })
}

// fetch all product categorys ;
export function fetch_category () {
  let url = `${API_ENDPOINT}/productcategory/shopper/${Core.merchantid}`
  return fetch(url)
    .then((resp) => { return resp.json() })
    .then(json => {
      if (!json.error) {
        Core.db_merchant.category.bulkPut(json.category)
          .then(x => {
            if (x) { console.log('category fetched') } else { console.log('category fetch update failed') }
          })
          .catch(e => {
            console.log('error fetching category', e)
          })
      }

      return json
    })
    .catch(e => {
      console.log('error fetchin category', e)
    })
}

function update_inventory_db (inv) {
  const db = Core.db_merchant
  db.transaction('rw', db.inventory, async function () {
    let data
    for (let i = 0; i < inv.length; i++) {
      data = Object.assign({}, inv[i])
      await db.inventory.get({ code: data['code'] })
        .then((row) => {
          if (row != undefined) {
            // console.log('get row ', row.id) ;
            if (_.isEqual(row, data)) {
              // console.log('skipping update, data equal',row, data) ;
            } else {
              db.inventory.update(row.id, data)
                .then(key => {
                  // console.log('row updated on sync',row, data)
                })
                .catch(e => {})
            }
          } else {
            db.inventory.add(data)
              .then(key => {
                // console.log('row added on sync', key)
              })
              .catch(e => {})
          }
        })
        .catch(e => { console.log('Sync error', e) })
    }
  })
}

function search_db_for_items (val) {

}

/**
  sync items ;
*/
// variable to hold synced items on inventory
const unstale_items = [] ;
// method fetch items  that have been modified after a certain date from the inventory
export async function syncInventory (last_synced= 0, start=0, display=100)
  {
  let url =  API_ENDPOINT+'/inventory/shopper/'+Core.merchant+'?start='+start+'&display='+display+'&timestamp=1' ;
  // console.log( 'syncing from syn inventory' );
  fetch(url)
    .then((resp)=>{
    return resp.json() ;
    })
  .then(resp=>{
    // console.log('Resp ',resp) ;
    if(resp.error)
      {
      console.error('sync error', resp.error) ;
      }
    else
      {
      // update the db ;
      // stats
      // console.log(resp.record) ;
      let inv = resp.inventory ;
      let data ;
      const db = Core.db_merchant ;
      // db.inventory.bulkPut(inv) ;
      inv = Core.set_db_id('code', inv) ;
      // db.inventory.bulkPut(inv) ;

      db.transaction('rw',db.inventory, async function(){
        for(let i=0; i < inv.length ; i++)
          {
          data = Object.assign ( {}, inv[i] ) ;
          data.rate = Core.parse_rate(data.rate)
          unstale_items.push(data.code) ;
          await Core.db_merchant.inventory.get({code:data['code']})
            .then((row)=>{
              // console.log('get row ', row) ;
              if(row != undefined)
                {
                Core.db_merchant.inventory.update(row.id, data)
                  .then(key=>{
                  // console.log('row updated on sync',row, data)
                  })
                  .catch(e=>{
                    // console.log('error updating inventory on sync') ;
                  })
                }
              else
                {
                Core.db_merchant.inventory.add(data)
                  .then(key=>{
                      // console.log('row added on sync', data)
                  })
                .catch(e=>{})
                }
            })
          .catch(e=>{ console.log('Sync error', e)})
          }
        })
      .then(()=>{
        let record = resp.record ;
        let st = parseInt(resp.record.start) ;
        let dp = parseInt(resp.record.display);
        let tt = parseInt(resp.record.total) ;
        // update the syncProgress ;
        postMessage({source:'syncInventory', data:{start:st, display:dp, total:tt} }) ;
        if(( st + dp ) < tt)
          {
          setTimeout(3000, syncInventory(0,st+dp, dp) ) ;
          }
        else
          {
          //delete rows that may be obsolete ;
          // console.log('deleteing stale items ',unstale_items) ;
          db.inventory.where('id').noneOf(unstale_items).delete().
            then((rows)=>{
              console.log( rows+' items deleted after sync') ;
            }) ;
          }
        })
        .catch(e=>{ console.log('Sync transaction error', e)})
          // we could call this function recursively until all records have been fetched ;
          // capturing all changes in the inventoryChange variable placed in db_merchant.on(changes) ;
          }
      })
      .catch( e => {console.log('sync error', e)}) ;
    }

export default {
  fetch_item_from_api,
  syncInventory
}
