export class Core {
// set the request headers and body here
  // should probably be set_request_options
  static set_fetch_headers (body = {}, headers = {}) {
    let def = {
      method: 'GET',
      headers:
              {
                Authorization: this.Authorization || '',
                'Content-Type': 'Application/json'
              }
    }
    let t = Object.assign(def, headers)
    if (Object.keys(body).length > 0) {
      if (!('body' in t)) {
        t.body = JSON.stringify(body)
      }
    }

    return t
  }
  // call to fetch the resource here
  static go_fetch (url, options, callback) {
    return fetch(url, options)
      .then((resp) => { return resp.json() })
      .then((json) => {
        if (callback) {
          callback(json)
        }

        return json
      })
      .catch(e => {
        console.log('fetch error', e)
        return Error(e)
      })
  }

  static socket_send (data) {
    // data = {url:"",options:{}} ;
    // endpoint = inventory | category | Order |
    this.socket.send(data)
  }

  static parse_rate (rate) {
    let sv; let sp; let so = []
    let v = typeof rate === 'string' ? JSON.parse(rate) : rate

    if (Array.isArray(v)) {
      v.forEach(function (val) {
        sv = val.toString().trim()
        if (sv != '') {
          // price is expected to be of the format '1@300' i.e count@cost
          sp = sv.split('@')
          if (sp.length == 2) // count @ selling price
          {
            so.push({ count: sp[0], price: sp[1] })
          }
        }
      })
    }

    return so
  }

  // for inbound ids into indexedDb
  // sample usage [{name:"ayo", mail:"ade@me.com"}]  ;
  // set_db_id('email', [{name:"ayo", mail:"ade@me.com"}] )
  // returns [{id:ade@me.com, name:"ayo",mail:"ade@me.com"}]
  static set_db_id (key, input) {
    if (Array.isArray(input)) {
      for (let i = 0; i < input.length; i++) {
        input[i]['id'] = input[i][key]
      }
      return input
    }

    return input
  }

  static get_cur_time_interval (cur_time) {
    let ct = moment.unix(cur_time)
    let start = ct.startOf('day').format('X')
    let end = ct.endOf('day').format('X')

    return { start: start, end: end }
  }

  static getUrl(url, ext){
    if (ext)
      url+=`/${ext}`
    return url ;
  }
}

export default Core
