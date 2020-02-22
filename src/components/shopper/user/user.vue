<template>
    <!--<div class="py-1 container-fluid position-sticky w-100 z-index-sticky text-uppercase" style="
        color: rgb(100, 183, 255);
        background: aliceblue;
        top: 50px;
        ">
        <div class="container">
            <span class="small" style="font-weight:500 ;">{{viewTitle}}</span>
        </div>
    </div>-->
    <router-view class="w-100"></router-view>
    <!--<footer-menu />-->
</template>
<script>
import * as userLogic from './logic.js'
import { mapActions } from 'vuex'
import Core from '@/class.core.js'
import userLayout from '@/layouts/userLayout.vue'

export default {
  name: 'User',
  components: {
    userLayout
  },
  data: function () {
    return {

    }
  },
  mounted: function () {
    this.init_user()
  },
  computed: {
    viewTitle: function () {
      let c = ''
      switch (this.$route.name) {
        case 'saved-stores':
          c = 'Saved stores'
          break
        case 'transactions':
          c = 'transactions'
          break
        case 'orders' :
          c = 'orders'
          break
        case 'saved-cards' :
          c = 'saved cards'
          break
      }

      return c
    }
  },
  // before
  methods: {
    ...mapActions({
      init_store: 'user/init_data_store'
    }),
    init_user: async function () {
      let db_user = await this.init_store()
      Core.db_user = db_user
      const vm = this
      // load user transactions in localdb ;
      userLogic.fetch_local_transactions()
        .then(v => {
          vm.$store.commit('user/add_transactions', v)
        })
        .catch(e => {
          console.log('transaction error ')
        })

      // load user orders on localdb ;
      userLogic.fetch_local_orders()
        .then(v => {
          vm.$store.commit('user/add_orders', v)
        })
        .catch(e => {
          console.log('User Order error ', e)
        })
      // doing db_user.tablename is equivalent to Core.db_user.tablename ;
    }
  }
}
</script>
