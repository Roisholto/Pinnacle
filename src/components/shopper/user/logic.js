import Core from '@/class.core.js'
export function fetch_local_transactions () {
  return Core.db_user.payment.toCollection().toArray().then(v => {
    return v
  })
}

export function fetch_local_orders () {
  return Core.db_user.orders.orderBy('created').toArray().then(v => {
    return v
  })
}

// fetch Orders from api only suitable when user is signedin and
export function fetch_orders () {
  // Core.set_fetch_headers();
}
