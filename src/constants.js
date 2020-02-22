export const store_types = { store: 1, restaurant: 2, others: 0 }

export const publicPath = process.env.BASE_URL

export const PUBLIC_PATH = process.env.BASE_URL

export const API_ENDPOINT = process.env.VUE_APP_API_ENDPOINT

export const SOCKET_ADDRESS = process.env.VUE_APP_SOCKET_ADDRESS

export const MODE = process.env.NODE_ENV

export const AUTH_URL = process.env.NODE_ENV == 'development' ? `http://localhost:8083/#/` : location.origin + '/auth/#/'

export const APP_NAME = process.env.VUE_APP_APP_NAME

export const INSTALL_MODE = 'standalone' ;

export const PRIMARY_COLOR = process.env.VUE_APP_PRIMARY_COLOR ? process.env.VUE_APP_PRIMARY_COLOR : '#f33348' 

// export const API_ENDPOINT = process
export function calc_preorder_duration_unit (duration) {
  // duration ins seconds
  if (duration < 60 * 60) { return { unit: 'min', value: (duration / 60) } }

  if (duration < 60 * 60 * 24) { return { unit: 'hr', value: duration / (60 * 60) } }

  if (duration < (60 * 60 * 24 * 30)) { return { unit: 'day', value: duration / (60 * 60 * 24) } }

  return { unit: 'mth', value: duration / (60 * 60 * 24 * 30) }
}
