export class TableStructures {
  constructor () {
    // merchant
    this.merchant_store = {
      inventory: 'id, name, code, category, rate, stock',
      category: 'id, name, count',
      settings: '',
      managers: 'id, email, priv, created',
      invoice: 'id, inv_id, app_id, acc, preordered, home_delivery, is_validated, prints, payment_method, payment_merchant, payment_status, amount, attr, created',
      order: 'id, items',
      dummy: '++id'
    }

    // manager
    this.user_store = {
      stores: '++id, &mid, name, loc, addr, type, icon, priv'
    }

    // object store for inventory similar both in merchant and client ;exept for themanagers key ;
    const shopper_store = Object.assign({}, this.merchant_store)
    delete shopper_store.managers
    this.shopper_store = shopper_store

    // shopper
    this.shopper = {
      payment: '&ref, invoice',
      orders: '&inv_id, order_detail, payment_ref,payment_method,  amount, preordered, home_delivery, created',
      saved_stores: '&mid, name, alias'
    }
  }
}

export default TableStructures
