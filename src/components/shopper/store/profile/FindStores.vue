<template>
  <storeLayout>
    <div :style="{minHeight: `calc(100vh - ${top}px)`}">
      <v-sheet elevation="0" color="primary" style="border-radius: .4rem " class="py-4 mb-4">
        <div class="display-1 text-center white--text mb-2">
          Find stores
        </div>
        <div class="mx-auto pb-6" style="max-width:25em">
          <v-text-field label="Search" dense solo hide-details v-model="search_text" prepend-inner-icon="mdi-magnify" clearable></v-text-field>
        </div>
      </v-sheet>

      <v-sheet color="transparent" class="row">
        <div class="col-md-4 d-flex flex-grow col-sm-6 py-2" v-for="(address, index) in sorted_address" :key="address.label">
          <v-hover  >
            <template v-slot="{ hover }">
              <v-card class="px-2 flex-grow-1" :elevation="hover ? 6 : 3">
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{address.label}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <div class="body-2">{{address.full_address}}</div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </template>
          </v-hover>
        </div>
      </v-sheet>
    </div>
  </storeLayout>
</template>
<script>
import storeLayout from '@/layouts/storeLayout.vue' ;

export default {
  name:"FindStores",

  data(){
    return {
      search_text:null
    }
  },

  computed:{
    top(){
      return this.$vuetify.application.top ;
    },

    address(){
      return this.$store.getters['merchant/pageComponents/altContact/get_contact'].address ;
    },

    filtered_address(){
      if(this.search_text)
        {
        let vm = this ;
        let rt = [] ;
        this.address.forEach(function(v){
          if(v.label.toUpperCase().indexOf(vm.search_text.toUpperCase()) != -1)
            rt.push(v)
        })

        return rt ;
        }
      else
        return this.address ;
    },

    sorted_address(){
      return this.filtered_address ;
    }
  },

  components:{
    storeLayout
  }
}
</script>
