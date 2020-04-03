/* eslint-disable */
<template>
    <router-view></router-view>
</template>
<script>
import Dexie from 'dexie' ;
import 'dexie-observable' ;
import {API_ENDPOINT, SOCKET_ADDRESS} from '@/constants.js' ;
import TableStructures from '@/class.db_structures.js' ;
import Core from '@/class.core.js' ;
import * as siJs from '@/shopper.inventory.js' ;
import {mapState} from 'vuex' ;
import Vue from 'vue' ;

Core.API_ENDPOINT= API_ENDPOINT ;

const tbStructures = new TableStructures() ;
export default {
    name:'StoreMain',
    components:{

        },
    data: function()
        {
         return {
             }
        },
    computed:{
        current_merchant:function()
            {
            let is_m = this.is_merchant() ;
            return is_m ;
            },
        ...mapState({
            merchantInfo:state=> state.merchant.info,
            ui:state=>state.ui
            }),
        },
    watch:{
        current_merchant:function(nv)
            {
            if(nv)
                this.switch_store(nv) // '15542843fdee5437' ;
            }
        },
    created:function()
        {

        },
    mounted: function()
        {
        // should probably be put in the before route enter ;
        if(this.current_merchant)
            {
            this.switch_store(this.current_merchant)
            }

        },
    updated:function()
        {

        },

    methods:
        {
        is_merchant: function()
            {
            // set current merchant ;
            let the_route = this.$route.path.split('/') ;
            let the_merchant=''  ;
            if (the_route.indexOf('store')==1 )
                {
                the_merchant =  the_route[2]  ; // this.$route.params['storeid']
                }

            return the_merchant ;
            },

        switch_store: function(storeid)
            {
            if(storeid == '' || this.$store.state.merchant.info.mid == storeid)
                {
                //console.log('switch store called', storeid ) ;
                return ;
                }

            // if user is signed in then an access token is stored in the cookie ;
            // if not request a short live token to access the store ;
            // open a socket connection to the shopper and start listening for modifications ;

            const vm = this ;
            fetch(Core.API_ENDPOINT+'/stores/shopper/'+storeid)
                .then(resp=>{return resp.json()})
                .then(store_data=>{
                    if(! ('error' in store_data) )
                        {
                        vm.$store.commit('merchant/init_store',store_data) ;

                        // user database creation
                        const db_merchant = new Dexie('shopper_'+storeid) ;
                        db_merchant.version(1).stores(tbStructures.shopper_store) ;

                        Core.db_merchant = db_merchant ;
                        Core.merchant = storeid ;
                        Core.merchantid = storeid ;// dont want to go back to looking for places i have used Core.merchant
                        localStorage.setItem('merchantId', storeid) ;

                        db_merchant.transaction('rw',db_merchant.category,db_merchant.settings, db_merchant.inventory, function(){
                            // update the category
                            // modify the category ;
                            let categorys_ = [] ;
                            /*Object.keys(store_data.inventory.category)
                                .forEach(function(i){
                                    categorys_.push({id:i, name:store_data.inventory.category[i]})
                                }) ;

                            db_merchant.category.clear()
                                .then(()=>{
                                    db_merchant.category.bulkPut(categorys_) ;
                                })*/
                                //.then(resp=>{console.log(resp)})
                                //.catch(e=>{console.log('error in category update : ', e)})


                            // update the settings
                            //db_merchant.settings.put(store_data.settings)
                            //    .then(resp=>{console.log(resp)})
                            //    .catch(e=>{console.log('error in settings update : ', e)}) ;

                            // update/sync the inventory
                            })
                            .then(()=>{
                                // update views
                                siJs.load_inventory().then(inventory=>{
                                    if(inventory)
                                        vm.$store.commit('merchant/add_item_to_inventory', inventory);
                                }) ;

                                siJs.fetch_category()
                                    .then((categorys)=>{
                                        if(categorys)
                                            {
                                            vm.$store.commit('merchant/overwrite_categorys', categorys.category) ;
                                            }
                                    })
                                .catch((e)=>{
                                    console.log('failed to fetch categ', e) ;
                                })

                                /*siJs.load_category().then((categorys)=>{
                                    {
                                    if(categorys) // could return null
                                        {
                                        // should not overwrite since the data may be stale ;
                                        /**/ // app.merchant.inventory.categorys = categorys ;
                                        // vm.$store.commit('insert_categorys', categorys) ;
                                    /*    }
                                    }

                                });*/

                                // load subList ;
                                fetch(`${API_ENDPOINT}/inventory/sublist/shopper/${storeid}/top-list`)
                                    .then(resp=>resp.json())
                                    .then(json=>{
                                        vm.$store.commit('merchant/insert_top_list', json) ;
                                    })
                                .catch(e=>{
                                    console.log('error fetching top on list', e) ;
                                    })
                            })
                        .catch(e=>{console.log(e)})

                        // add listeners to changes in the merchant table
                        db_merchant.on('changes', function(changes){

                            const inventoryData = {update:[], insert:[], delete:[]} ;
                            const categoryData = {update:[], insert:[], delete:[]} ;
        				    changes.forEach(function(change){
                                switch(change.type)
                                    {
                                    case 1: // created
                                        // console.log('An object was created : '+ JSON.stringify(change.obj), change ) ;
                                        // update the data grid if its a new entry : Obviously it is
                                        if(change.table == 'inventory')
                                            {
                                            inventoryData.insert.push(change.obj) ;
                                            // let data = Array.isArray(change.obj) ?  change.obj : [change.obj] ;
                                            }

                                        if(change.table== 'category')
                                            {
                                            categoryData.insert.push(change.obj) ;
                                            }

                                        break ;
                                    case 2: // update
                                        // console.log('An object with key : '+ change.key + ' was modified to '+  JSON.stringify(change.mods)) ;
                                        // console.log(change)
                                            if(change.table == 'inventory')
                                                {
                                                inventoryData.update.push(change.obj) ;
                                                }

                                            if(change.table== 'category')
                                                {
                                                categoryData.update.push({old:change.oldObj,new:change.obj}) ;
                                                }

                                        break ;
                                    case 3: // deleted
                                        // console.log('An object was deleted : '+ JSON.stringify(change.oldObj), change) ;
                                        // update the inventorydataView ;
                                        if(change.table == 'inventory')
                                            {
                                            // let data = Array.isArray(change.obj) ?  change.obj : [change.obj] ;
                                            let code = change.oldObj.code ;
                                            inventoryDelete.push(code) ;
                                            }

                                        if(change.table== 'category')
                                            {
                                            categoryData.delete.push(change.oldObj) ;
                                            }


                                        break ;
                                    }
                            })

                        //since listening on bulkAdd only returns last item
                        if(inventoryData.insert.length)
                            {
                            vm.$store.dispatch('merchant/add_inventory_items', inventoryData.insert)
                            }

                        if(inventoryData.update.length)
                            {
                            // inventoryDataView.beginUpdate() ;
                            // console.log('inventory update',inventoryData.update) ;
                            vm.$store.dispatch('merchant/add_inventory_items', inventoryData.update)
                            }

                        if(inventoryData.delete.length)
                            {
                            vm.$store.dispatch('merchnt/delete_inventory_items', inventoryData.delete)
                            }

                        //categoryData
                        /*if(categoryData.update.length)
                            {
                            // categoryData.update is an array of objects [{oldv:{},new:{}}]
                            // console.log('categoryData',categoryData.update) ;
                            let id ; // hold the id of the current  category
                            let inv_ct = [] ;// will be populate with
                            let oldname,newname ;
                            categoryData.update.forEach(function(category){
                                // console.log('updating Vue category',category)
                                id = category.old.id() ;
                                Vue.set(app.merchant.categorys, id, Object.assign({}, category.new))
                                // the updating of the inventory table could happen otside here prefer
                                // ably in the update_category() ;
                                oldname = category.old.name.toString().toUpperCase() ;
                                newname = category.new.name.toString().toUpperCase() ;
                                // console.log(oldname,newname)
                                if(oldname != newname)
                                    {
                                    db_merchant.transaction('rw',db_merchant.inventory, function(){
                                        // db_merchant.inventory.where('category').equalsIgnoreCase(oldname).update({category:newname}) ;
                                        })
                                    .catch(e=>{console.log('inventory category update Error', e)})
                                    }
                                })
                            } */

                        if(categoryData.insert.length)
                            {
                            // categoryData.update is an array of objects [{oldv:{},new:{}}]
                            // console.log('categoryData',categoryData.insert) ;
                            vm.$store.commit('merchant/insert_categorys', categoryData.insert) ;
                            }

                        if(categoryData.delete.length)
                            {
                            let id, id_arr= [] ;
                            categoryData.delete.forEach((data)=>{
                                id = data.id // .toString() ;
                                id_arr.push(id)
                                }) ;

                            vm.$store.commit('merchant/delete_categorys', id_arr) ;
                            }
                        // invent_add = [] ;
                        })
                        // load product categor
                        // async
                        let ws_url = SOCKET_ADDRESS+'?token='+store_data.jwt ;
                        const shopperSocket = new WebSocket(ws_url);
                        this.shopperSocket = shopperSocket ;

                        shopperSocket.addEventListener('open', function(ev){
                            console.log('socket opened',ev)
                            })

                        shopperSocket.addEventListener('close', function(ev){
                            console.log('socket closed',ev)
                            })

                        shopperSocket.addEventListener('error', function(ev){
                            console.log('socket error',ev)
                            })

                        shopperSocket.addEventListener('message', function(ev){
                            console.log('socket message',ev.data)
                            /*
                            try
                                {
                                const response = JSON.parse(ev.data) ;
                                const section = response.section ;
                                const action = response.action ;
                                const data = response.data ;

                                switch (section)
                                    {
                                    case 'inventory_category' :
                                        invJs.handle_category_change(action,data) ;
                                        break ;
                                    case 'inventory_item' :
                                        invJs.handle_inventory_item_change(action,data) ;
                                        break ;
                                    default:
                                        console.log('not found') ;
                                        break ;
                                    }
                                }
                            catch(e)
                                {
                                console.log(e)
                            }*/
                            })

                        // should close the socket on route leave ;
                        }
                    else
                        {
                        // show a message about the error
                        }
                })

            }
        }
}
</script>
