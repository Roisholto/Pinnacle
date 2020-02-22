import { API_ENDPOINT } from '@/constants.js'
import Core from '@/class.core.js'

export function fetch_stores () {
  let url = `${API_ENDPOINT}/shopper/saved-stores`
  let options = Core.set_fetch_headers()

  return fetch(url, options)
}

export function fetch_locations() {
    let url = `${API_ENDPOINT}/shopper/saved-locations`
    let options = Core.set_fetch_headers()

    return fetch(url, options)
}
