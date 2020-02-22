export default function to_currency (fig, [locale, currency]) {
  let formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  })

  return formatter.format(fig)
}

export function naija_currency (fig) {
  return to_currency(fig, ['en-NG', 'NGN'])
}
