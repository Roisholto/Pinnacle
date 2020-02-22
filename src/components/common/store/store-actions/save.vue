<template>
    <div v-if="! processing">
        <div class="pa-2 cursor-pointer" @click="save" v-if="!isMerchantSaved">Save</div>
        <div class="pa-2 text-danger cursor-pointer" @click="remove" v-else>remove</div>
        <!--<template v-if="showDialog">-->
            <!--<v-dialog v-model="dialogState">
                <v-card>
                        <div v-html="snackText" class="pa-4"></div>
                </v-card>
            </v-dialog>-->

    <!--    </template>-->
    </div>
    <div class="pa-2" v-else>
        <lds-ring/>
    </div>
</template>
<script>
import ldsRing from '@/components/common/css-loaders/lds-ring.vue'
import { mapGetters, mapState } from 'vuex'
import { PUBLIC_PATH, MODE, API_ENDPOINT } from '@/constants.js'
import Core from '@/class.core.js'
import jBox from 'jbox'

// function()
export default {
  name: 'save',
  props: {
    mid: String
  },
  data: function () {
    return {
      processing: false,
      snackText:'',
      dialogState:false,
      showDialog:false
    }
  },
  computed: {
    ...mapState({
      // returns an arry of mid s
      savedStores: (state) => {
        let st = []
        state.user.saved_stores.forEach((v) => {
          st.push(v.mid)
        })

        return st
      }
    }),
    ...mapGetters({
      isSessionActive: 'user/isSessionActive',
      authUrl: 'authUrl'
    }),
    isMerchantSaved: function () {
      return this.savedStores.indexOf(this.mid) != -1
    }
  },
  watch: {
    processing: function (nv, ov) {
      this.$emit('process-status', nv)
    }
  },
  components: {
    ldsRing
  },
  methods: {
    save: function () {
      let vm = this
      let mess = ''
      let goto = location.origin + PUBLIC_PATH + 'store/' + this.mid
      let auth = MODE == 'development'
        ? `http://localhost:8083/#/signin?as=shopper&goto=${goto}`
        : `${vm.authUrl}/signin?as=shopper&goto=${goto}`

      if (this.isSessionActive === null) {
        mess = `Oops you are not signed in. <a href="${auth}">Sign in</a> to add store to your saved stores`
      } else {
        if (!this.isSessionActive) {
          mess = `Oops your session expired, <a href="${auth}">Sign in</a> to add store`
        }
      }

      if (mess) {
         // this.snackText = mess ;
          // this.dialogState = true ;
        new jBox('Modal', {
          content: `<div>${mess}</div>`,
          onInit: function () {
            this.open()
          },
          onCloseComplete: function () {
            this.destroy()
          }
      })
        // this.hideTooltip()
      } else {
        this.send_request('post')
      }
    },
    remove: function () {
      console.log('remove store')
      this.send_request('delete')
    },
    send_request: function (method) {
      // method = 'post or delete' ;
      let vm = this
      let url = API_ENDPOINT + '/shopper/saved-stores'
      let options = Core.set_fetch_headers({ mid: this.mid }, { method: method })
      this.processing = true
      this.$emit('process-status', true)
      fetch(url, options)
        .then(function (resp) {
          return resp.json()
        })
        .then(function (json) {
          if (method == 'post') {
            // commit add_saved_stores
            vm.$store.commit('user/add_saved_stores', json.data)
          } else {
            // commit delete_saved_stores
            vm.processing = false
            vm.$store.commit('user/remove_saved_stores', json.data)
          }
        })
        .catch(function (e) {

        })
        .finally(function () {
          vm.processing = false
        })
    }
  }
}
</script>
