import qrcode from 'qrcode-generator'
const qrComp = {
  props: {
    data:
            {
              required: true,
              type: [String, Number]
            },
    options:
            {
              type: Object
            }
  },
  template: `<div ref="qrHolder" class="text-center"></div>`,
  watch: {
    data: function (n) {
      this.generate()
    }
  },
  mounted: function () {
    this.generate()
  },
  methods: {
    generate: function () {
      let qr = qrcode(0, 'L')
      qr.addData(this.data)
      qr.make()
      $(this.$refs.qrHolder).html(qr.createSvgTag(8))
    }
  }
}

export default qrComp
