
// Transaction is for the current day only
import moment from 'moment' ;
import Core from './class.core.js' ;
import {API_ENDPOINT} from './constants.js' ;

export function load_invoice()
    {

    }


// load invoice list from indexedDb
export function load_invoice_list(cur_time)
    {
    // load invoice from indexedb ;
    let ct = moment.unix(cur_time);
    let start = ct.startOf('day').format('X') ;
    let  end = ct.endOf('day').format('X');

    return Core.db_merchant.invoice.where('created').between(parseInt(start), parseInt(end) ).toArray(function(invoices){
        console.log('invoices got ', invoices)
        //if(invoices.length == 0)
        //    {
            sync_invoice( {created:{data:[start,end], factor:'between' } }, 0,100 ) ;
        //    }

        return invoices ;
        })
    .catch(e=>{console.log('load inventory error', e)})
    }

// load items listed on an invoice ;
export function load_order(invoice_id)
    {
    const db = Core.db_merchant ;
    return db.order.where({id:invoice_id}).first()
        .then(v=>{
            // console.log('found invoice on order',v) ;
            return v ;
        })
    .catch(e=>{console.log('load_order',e)})
    }


export function fetch_order(clause =[], start=0, display= 100)
    {
    const db = Core.db_merchant ;
    let url =  API_ENDPOINT+'/order/merchant/'+Core.merchant+'?clause='+encodeURIComponent(JSON.stringify(clause))+'&start='+start+'&display='+display+'&timestamp=1' ;
    let options = Core.set_fetch_headers();

    return fetch(url,options)
        .then(json=>{return json.json()})
        .then(resp=>{
            console.log('fetch order', resp) ;
            if(! ('error' in resp))
                {
                let order = Core.set_db_id('invoiceid', resp.order) ;
                db.order.bulkPut(order)
                    .then(row=>{
                        // console.log('order updated') ;
                    })
                }
            return resp ;

        })
    .catch(e=>{console.log('e',e)})
    }

export function fetch_invoice(clause=[], start=0, display= 100)
    {
    // from api
    let url = API_ENDPOINT+'/invoice/merchant/'+Core.merchant+'?clause='+encodeURIComponent(JSON.stringify(clause))+'&start='+start+'&display='+display+'&timestamp=1&array' ;
    let headers = Core.set_fetch_headers();
    return Core.go_fetch(url,headers, function(resp){
        if(! ('error' in resp) )
            {
            const invoices = Core.set_db_id('inv_id', resp.invoice) ;
            console.log('invoices',invoices) ;
            Core.db_merchant.invoice.bulkPut(invoices)
                .then((rows)=>{
                    // console.log('invoice rows added')
                })
            .catch(e=>{console.log('invoice error', e)})
            }
        return resp ;
        })
    .catch(e=>{
        return  Promise.reject(e ) ;
    })

    }

export function fetch_unmet_orders(start=0, display=100){
    let today = moment.unix(Core.last_server_time) ;
    let day_start = today.clone().startOf('day').format('X') ;
    let day_end = today.clone().endOf('day').format('X') ;
    let clause = [
                    {created:{data:[day_start,day_end], factor:'notbetween'}},
                    "and",
                    [
                        [
                            {preordered:{data:[0], factor:"greaterthan"} },
                            "and",
                            {validated:{data:[0], factor:'equalto'} }
                        ],
                        "or",
                        [
                            {home_delivery:{data:[1], factor:"equalto"} },
                            "and",
                            {validated:{data:[0], factor:'equalto'} }
                        ]
                    ]
                ]

    return fetch_invoice(clause, start, display) ;
    }
// method fetch items  that have been modified after a certain date from the inventory
export async function sync_invoice(clause=[],start=0, display= 2)
    {
    let url =  API_ENDPOINT+'/invoice/merchant/'+Core.merchant+'?clause='+encodeURIComponent(JSON.stringify(clause))+'&start='+start+'&display='+display+'&timestamp=1' ;
    let headers = {Authorization: Core.Authorization} ;
    console.log( 'syncing from sync_invoice' );
    fetch(url,{headers: headers}).then((resp)=>{
        return resp.json() ;
        })
    .then(resp=>{
        console.log('Resp ',resp) ;
        if('error' in resp)
            {
            console.log('sync error', resp.error) ;
            }
        else
            {
            console.log('no error found on sync invoice', resp)
            // update the db ;
            // stats
            // console.log(resp.record) ;
            let invoices = resp.invoice ;
            let data ;
            const db = Core.db_merchant ;
            // db.inventory.bulkPut(inv) ;
            invoices = Core.set_db_id('inv_id', invoices) ;
            // db.inventory.bulkPut(inv) ;

            db.transaction('rw',db.invoice, async function(){
                for(let i=0; i < invoices.length ; i++)
                    {
                    data = Object.assign ( {}, invoices[i] ) ;
                    // unstale_items.push(data.code) ;
                    await db.invoice.get({inv_id:data['inv_id']})
                        .then((row)=>{
                            // console.log('get row ', row) ;
                            if(row != undefined)
                                {
                                // console.log('get row ', row.id) ;
                                //if (row != data)
                                //  {

                                db.invoice.update(row.id, data)
                                    .then(key=>{
                                    // console.log('row updated on sync',row, data)
                                }).
                                catch(e=>{})

                                    // }
                                }
                            else
                                {
                                db.invoice.add(data)
                                    .then(key=>{
                                    //    console.log('row added on sync', data)
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

                    if(( st + dp ) < tt)
                        {
                        setTimeout(8000, sync_invoice(0,st+dp, dp) ) ;
                        }
                    else
                        {
                        //delete rows that may be obsolete ;
                        /*console.log('deleteing stale items ',unstale_items) ;
                        db.inventory.where('id').noneOf(unstale_items).delete().
                            then((rows)=>{
                                console.log( rows+' items deleted after sync') ;
                            }) ; */
                        }
                    })
            .catch(e=>{ console.log('Sync transaction error', e)})


            // we could call this function recursively until all records have been fetched ;
            // capturing all changes in the inventoryChange variable placed in db_merchant.on(changes) ;
            }
        })
        .catch( e => {console.log('sync error', e)}) ;

    }

// load the print info for invoice
export function load_prints(inv_id)
    {
    // change inv_id to clause later ;
    }
