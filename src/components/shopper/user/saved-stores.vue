<template>
    <userLayout>
        <div v-if="savedStores.length" class="remove-last-border w-100">
            <!--<router-link
                v-for="store in savedStores"
                :to="{name:'store', params:{storeid:store.mid}}"
                class="border-bottom py-2 d-block"
                v-bind:key="store.mid">-->
                <store-level-1
                    v-for="store in savedStores"
                    v-bind:store="store"
                    v-bind:options="{showMenu:true, showDistance:false}"
                    v-bind:key="store.mid"
                    class="border-bottom py-2"
                    v-on:body-clicked="goto_store(store.mid)"
                    />
            <!--</router-link>-->
        </div>
        <div class="text-center font-weight-bold" v-else>No record found</div>
    </userLayout>
</template>
<script>
import { mapState } from 'vuex'
import { API_ENDPOINT } from '@/constants.js'
import Core from '@/class.core.js'
import storeLevel1 from '@/components/common/store/store-level-1.vue'
import { fetch_stores } from '@/api/shopper.saved-stores.js'
import userLayout from '@/layouts/userLayout.vue' ;

export default {
  name: 'savedStores',
  data: function () {
    return {
      // indicate if sending server request
      processing: false
    }
  },
  computed: {
    ...mapState({
      savedStores: (state) => state.user.saved_stores
    })
  },
  components: {
    storeLevel1,
    userLayout
  },
  mounted: function () {
    // if(! this.savedStores.length)
    this.fetch_stores()
  },
  methods: {
    fetch_stores: function () {
      let vm = this
      fetch_stores()
        .then(function (resp) {
          return resp.json()
        })
        .then(function (json) {
          if ('error' in json) {
          } else {
            vm.$store.commit('user/add_saved_stores', json.data)
          }
        })
        .catch(function (e) {
          console.log('error fetching saved stores', e)
        })
        .finally(function () {
          vm.processing = false
        })
    },
    goto_store: function (store) {
      this.$router.push({ name: 'store', params: { storeid: store } })
    }
  }
}
</script>

<style lang="scss">

</style>
