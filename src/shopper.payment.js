import Core from './class.core.js'
import { API_ENDPOINT } from './constants.js'

export function send_cart_details (cart) {
  let url = API_ENDPOINT + '/invoice/shopper/' + Core.merchantid
  let options = Core.set_fetch_headers(cart, {method: 'POST'}) ;
  return fetch(url, options) //  { method: 'POST', body: JSON.stringify(cart) }
    .then(json => { return json.json() })
    .then(resp => {
      // json data should contain 'invoice-id, and amt-paid'
      // console.log(resp)
      return resp
    })
    .catch(e => {
      // console.log('cart error', e);
      return Promise.reject(e)
    })
}

export function get_delivery_quotation (network, body) {
  // delivery_networks[network].endpoint.development+'/quotation';
  let mode = process.env.NODE_ENV
  let endpoint = delivery_networks[network].endpoint[mode] + delivery_networks[network].resource.quotation
  let options = Core.set_fetch_headers(body, { method: 'POST', headers: { Authorization: delivery_networks[network].public_key } })
  //console.log(options)

  return fetch(endpoint, options)
}

export function make_payment (invoice) {
  let url = API_ENDPOINT + '/payment/shopper/transaction/' + identityCore.merchantid
  let options = Core.set_request_headers(invoice)
  return Core.go_fetch(url, options)
}

const delivery_networks = {
  max: {
    endpoint: {
      production: 'https://api.max.ng/v1',
      development: 'https://sandbox.max.ng/v1'
    },
    resource:
            {
              quotation: '/pricings/estimate'
            },
    public_key: 'pk_e2f997066c1c7dce35f7cba9ed971611a4606921ce53261121ba0483d7d90e86'
  },
  gokada: {
    endpoint: {
      production: '',
      development: ''
    }
  },
  redstar: {
    endpoint: {
      production: '',
      development: ''
    }
  }
}
