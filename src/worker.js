import Dexie from 'dexie' ;
import 'dexie-observable' ;
// importScripts ('./merchant.stores.js');
import inventory from './shopper.inventory.js' ;
import TableStructures from './class.db_structures.js' ;
import Core from './class.core.js' ;
import {API_ENDPOINT} from './constants.js' ;

let rand_ = Math.random() ;
let dbStructures = new TableStructures() ;
function execFunc (name,context)
    {
    const args = Array.prototype.slice.call(arguments,2) ;
    console.log(args) ;
    const namespaces = name.split('.') ;
    const func = namespaces.pop() ;
    for( let i = 0; i< namespaces.length; i++)
        {
        context = context[namespaces[i]] ;
        }
    console.log(namespaces,func,args) ;
    console.log(context,func,args) ;
    return context[func].apply(context,args) ;
    }


const func_map = {
  invJs: function ()
    {
    return inventory ;
    },
}

let merchantSocket ;
// console.log(self) ;
onmessage = function(e) {
    console.log('Message received from main script', e);
    let data = e.data ;
    let local_data = data.data ;
    switch (data.event) {
        case 'init':
            // open a socket connection to app ;
            // now open a web socket to start listening for changes on the server ;
            if(merchantSocket)
                merchantSocket.close();

            let db_merchant = new Dexie('shopper_'+local_data.merchantId) ;
            // console.log( 'store mid ',store.mid)
            db_merchant.version(1).stores(dbStructures.shopper_store) ;
            db_merchant.version(2).stores(dbStructures.shopper_store) ;
            // db_merchant.version(1).stores(dbStructures.merchant_store[1]) ;
            // db_merchant.version(2).stores(dbStructures.merchant_store[0]) ;

            // db_merchant.version(1).stores(dbStructures.merchant_store[0]) ;
            // db_merchant.version(2).stores(dbStructures.merchant_store[1]) ;

            // dummy insert and delete to trigger delete change ;
            // Can't explain why dexie does not catch the first delete change
            // but catches others
      			db_merchant.dummy.add({})
      				.then(insertid=>{
      					db_merchant.dummy.delete(insertid)
      						.then(rs=>{
      							console.log('triggered delete')
      						})
      				})
      			.catch(e=>{
      				console.log('trigger error',e)
      			})

            // postMessage()

            Core.Authorization = local_data.Authorization ;
            Core.merchant = local_data.merchantId ;
            Core.db_merchant =  db_merchant ;
            Core.API_ENDPOINT = API_ENDPOINT ;
            //initialize socket connection to merchant ;

            initSocket(local_data.user_access) ;
            // race could occur here, when the user switches
            // merchant while the current sync operation is not complete;
            inventory.syncInventory() ;
            // invJS.identity.db_user = db_user ;
            break;
        case 'socket':
            // socket commnication ;
            break ;
        case 'reconnectSocket':

            initSocket(local_data.token) ;

            break ;
        case 'function' :
            // CALL A FUNCTION ;
            // Expecting data as {'function', context:"", args:[]}
            let context = Object.keys(local_data).indexOf('context') == -1 ? self : local_data.context ;
            console.log('context is ', context, local_data.function) ;
            // console.log(func_map) ;
            //console.log(func_map[context]())
            let the_context = func_map[context]() ;

            the_context[local_data.function]( ...local_data.args )

            break ;
        case 'close':
            // terminate the worker ;
            // close the socket ;
            merchantSocket.close() ;
        case 'syncing':
            // invJs
            break ;
      default:

  }
}

function initSocket(token){
    let url = process.env.VUE_APP_SOCKET_ADDRESS ;
    merchantSocket = new WebSocket(url+'?token='+token);
    Core.socket = merchantSocket ;

    merchantSocket.addEventListener('open', function(ev){
        console.log('socket opened',ev)
        postMessage({source:'network_state', data:{type:'socket', state:'opened'}})
        })

    merchantSocket.addEventListener('close', function(ev){
        console.log('socket closed',ev)
        postMessage({source:'network_state', data:{type:'socket', state:'closed'}}) ;
        // reinitialize the connection ;
        })

    merchantSocket.addEventListener('error', function(ev){
        console.log('socket error',ev)
        })

    merchantSocket.addEventListener('message', function(ev){
        console.log('socket message',ev.data) ;
        // it is guaranteed that ev.data is a json
        try
            {
            console.log('socket message', ev) ;
            const response = JSON.parse(ev.data) ;
            if(response.EXCEPTION)
              {
              self.postMessage({source:'socket', data:response}) ;
              return ;
              }

            if(! response.type || (response.type  && response.type == 'api_request') )
                {
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
                    case 'managers' :
                        managersJs.handle_manager_change_from_socket(action,data)
                        break ;
                    case 'invoice':

                        break
                    default:
                        console.log('not found') ;
                        break ;
                    }
                }
            else if(response.type == 'client_broadcast')
                {
                switch(response.event)
                    {
                    case 'payment.success':
                        // update or insert into the invoices table ;
                        console.log('data for payment success', response.data.invoice) ;
                        paymentSuccessEvent(response.data.invoice)
                        break;
                    }
                }

            self.postMessage({source:'socket', data:response}) ;
            }
        catch(e)
            {
            // console.log(e)
            self.postMessage({source:'socket', data:JSON.parse(ev.data), EXCEPTION:e}) ;
            }
        })
}
