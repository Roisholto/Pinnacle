import Core from '@/class.core.js' ;
import {API_ENDPOINT} from '@/constants.js' ;

export function getStatus(search_text){
  let url = `${API_ENDPOINT}/delivery/status/shopper/${Core.merchant}?text=${search_text}` ;
  let options = Core.set_fetch_headers() ;

  return fetch(url, options)
}
