import Core from '@/class.core.js' ;
import {API_ENDPOINT} from '@/constants.js'

export function getQuotation(dest){
    let url = `${API_ENDPOINT}/delivery/quotation/${Core.merchant}`
    let options = Core.set_fetch_headers({ destination: dest}, { method: 'post' })

    return fetch(url, options)

}
