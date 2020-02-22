// add a new pack
<template>
    <form v-on:submit.prevent="complete_add_pack">
        <div class="d-flex">
            <div class="pr-2">
                <input type="text" name="pack" value="" v-model="pack" class="form-control form-control-sm" placeholder="Pack" autofocus required>
            </div>
            <div class="">
                <button class="form-control form-control-sm btn-secondary" >add</button>
            </div>
        </div>
    </form>
</template>
<script>
import jBox from 'jbox'

export default {
  name: 'addCartPack',
  data: function () {
    return {
      pack: ''
    }
  },
  computed: {
    cart: function () {
      return this.$store.state.merchant.cart
    }
  },
  methods: {
    // probably this function should be inside the store
    add_cart_pack: function (pack) {
      this.$store.commit('merchant/add_cart_pack', pack)
    },
    complete_add_pack: function () {
      let packname = this.pack

      if (packname.trim() != '') {
        let name_exists = false
        let v
        for (let i = 0; i < this.cart.length; i++) {
          v = this.cart[i]
          if (v.name == packname) {
            name_exists = true
            break
          }
        }
        if (!name_exists) {
          this.add_cart_pack(packname)
          this.$emit('pack-added', packname)
          new jBox('Notice', {
            content: 'Pack added',
            color: 'blue',
            autoClose: 800
          })
        } else {
          new jBox('Notice', {
            content: 'name exists',
            color: 'red',
            autoClose: 800
          })
        }
      }
    }
  }
}
</script>
