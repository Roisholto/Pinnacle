import moment from 'moment'

export function validate_preordered (time, duration) {
  //console.log('duration is', duration)
  // time is expected to be a datetime in seconds
  let date = moment.unix(time)
  let now = moment()

  let diff = date.format('X') - now.format('X')
  // when duration.max =0  then no limit is placed on duration max
  if ((diff >= duration.min) && (diff <= duration.max || duration.max == 0)) //
  { return true }

  return false
}

export function does_merchant_accept_orders_at_this_time (preorder, biz_hours) {
  // get the business hours ;
  // compare with today with the biz hours ;
  // if in biz hours ;
  // -> check if preorder ;

  const VClass = new class {
    constructor (bhr) {

    }

    validate_time (date = null) {
      // date is the today or preporder date for preorders
      let now = date ? moment(date) : moment()
      let dayname = now.format('dddd').toLowerCase()
      let startofday = now.startOf('day')

      // supporting only single biz hours
      let bizhrs = this.biz_hours[dayname][0]
      let open = startofday.clone().add({ seconds: bizhrs.open })
      let close = startofday.clone().add({ seconds: bizhrs.close })

      if ((open.format('X') <= now.format('X')) && (close.format('X') >= now.format('X'))) { return true }

      return false
    }
  }()

  VClass.biz_hours = biz_hours

  if (preorder) {
    if (validate_preordered(preorder)) {
      return VClass.validate_time(preorder)
    }
  } else {
    return VClass.validate_time()
  }

  return false
}
