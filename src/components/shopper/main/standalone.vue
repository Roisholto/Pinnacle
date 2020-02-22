<template>
    <v-app>
        <v-content class="d-flex">
            <v-container fluid class="justify-center">
                <div class="align-self-center">
                    Preparing page. . .
                </div>
            </v-container>
        </v-content>
    </v-app>
</template>
<script>
import { mapState } from 'vuex'
import { API_ENDPOINT } from '@/constants.js'

export default {
    name:"standalone",
    data:function(){
        return {
            store:{},
            error:'',
            processing: false
        }
    },

    mounted(){
        this.fetch_result() ;
    },

    methods:{
        fetch_result () {
          // Dont think this block is necessary
          const vm = this
          if (vm.requesting) {
            return
          }

         let url = API_ENDPOINT + '/search/outlets?search_text='

         vm.requesting = true
         fetch(url)
            .then(function (resp) {
              return resp.json()
            })
            .then(function (json) {
              if (json.succ) {
                vm.store = json.data.items[0]
                vm.$router.replace({name:'store', params:{storeid: vm.store.m_id } })
                }
                else
                {
                // console.log('failure resp', json)

                }
            })
            .catch(function () {

            })
            .finally(function () {
              vm.requesting = false
            })
        }
    }

}
</script>
