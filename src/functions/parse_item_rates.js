export default function parse_rate (rate) {
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
