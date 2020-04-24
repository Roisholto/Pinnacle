import Core from '@/class.core.js' ;
import {API_ENDPOINT} from '@/constants.js' ;

export function getUrl(ext){
  let url = `${API_ENDPOINT}/inventory/tags/shopper/${Core.merchant}` ;
  return Core.getUrl(url, ext ) ;

}

export function fetchTags(){
  let url = getUrl() ;
  let options = Core.set_fetch_headers() ;

  return fetch(url, options) ;
}

export default {
  getUrl,
  fetchTags
}
