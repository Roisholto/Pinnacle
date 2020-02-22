import Core from '../../../class.core.js'
import qrcode from 'qrcode-generator'
const PaymentQrcode = {
  props: {
      code:String,
      merchantId:String,
      invoiceId: String
    },
  template: `<div ref="qrHolder" class="text-center"></div>`,
  created: function () {

  },
  mounted: function () {
    let qr = qrcode(0, 'L') ;
    let url = `${location.origin}${process.env.BASE_URL}invoice?invoiceId=${this.invoiceId}&merchantId=${this.merchantId}&paymentRef=${this.code}`;
    console.log('url', url) ;
    qr.addData(url) ;
    qr.make()
    $(this.$refs.qrHolder).html(qr.createSvgTag(4))
  }
}

export default PaymentQrcode
