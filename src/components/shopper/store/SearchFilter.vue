/*Can't put the most appropriate name for this */
<template>
  <v-dialog
    v-model="show"
    max-width="400"
    scrollable
    >
    <template v-slot:activator="{ on }">

        <v-badge
          color="yellow darken-4"
          overlap
          :value="clauseLength"
          >
          <span slot="badge">
            {{clauseLength}}
          </span>
          <v-btn
            light
            color="grey lighten-2"
            v-on="on"
            fab
          >
            <v-icon>mdi-filter-outline</v-icon>
          </v-btn>
        </v-badge>

    </template>

      <v-card style="height:calc(100vh-100px)">

        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>John Leider</v-list-item-title>
              <v-list-item-subtitle>Founder of Vuetify.js</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                class="red--text"
                icon
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-card-text class="px-1">
          <!--<v-divider></v-divider>-->
        <!--<v-subheader>Brands</v-subheader>-->
          <v-expansion-panels
            hover
            v-model="panel"
            accordion
          >
            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-badge
                  left
                  :value="filters.data.brands.length">
                  <span slot="badge">{{filters.data.brands.length}}</span>
                  Brands
                </v-badge>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list dense class="py-0">
                  <v-list-item class="body-2 text-capitalize px-0" v-for="brand in brands" :key="brand">
                    <v-checkbox
                      v-model="selected_brands"
                      :value="brand"
                      hide-details
                      dense
                      color="primary lighten-2"
                      class="">
                      <span class="body-2 text-capitalize" slot="label">{{brand}}</span>
                    </v-checkbox>
                    <!--{{brand}}-->
                  </v-list-item>

                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <v-badge
                left
                :value="filters.data.tags.length">
                <span slot="badge">{{filters.data.tags.length}}</span>
                Tags
              </v-badge>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list dense class="py-0">
                  <v-list-item class="body-2 text-capitalize px-0" v-for="tag in tags" :key="tag">
                    <v-checkbox
                      v-model="selected_tags"
                      hide-details
                      dense
                      :value="tag"
                      color="primary lighten-2"
                      class="">
                      <span class="body-2 text-capitalize" slot="label">{{tag}}</span>
                    </v-checkbox>
                    <!--{{brand}}-->
                  </v-list-item>

                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="show = false">Cancel</v-btn>
          <v-btn color="primary" text @click="[applyFilter(), show = false]">Apply</v-btn>
        </v-card-actions>
      </v-card>

  </v-dialog>
</template>
<script>
import {fetchTags} from '@/api/product-tags.js' ;
import {fetchBrands} from '@/api/product-brands.js' ;
import {mapState} from 'vuex' ;
export default{
  name:"SeachFilter",

  data(){
    return {
      show:false,
      panel:0,
      selected_brands:[],
      selected_tags:[]
    }
  },

  computed:{
    ...mapState({
      filters:(state)=>state.merchant.filter,
      tags:(state)=>state.merchant.inventory.tags,
      brands:(state)=>state.merchant.inventory.brands,

    }),
    clauseLength(state){return this.filters.data.brands.length + this.filters.data.tags.length},


  },

  watch:{
    show(nv){
      if(nv){
        this.selected_brands = Array.from(this.filters.data.brands)
        this.selected_tags = Array.from(this.filters.data.tags)
      }
    }
  },

  mounted(){
    let vm = this ;
    fetchTags()
      .then(function(r){
        return r.json()
      })
      .then(function(json){
        if(json.succ){
          vm.$store.commit('merchant/set_product_tags', json.data.tags)
        }
      })
      .catch(function(e){
        console.log('error fetching tags', e)
      });

    fetchBrands()
      .then(function(r){
        return r.json()
      })
      .then(function(json){
        if(json.succ){
          vm.$store.commit('merchant/set_product_brands', json.data.brands)
        }
      })
      .catch(function(e){
        console.log('error fetching brands', e)
      })
  },

  methods:{
    applyFilter(){
      let d = {
        brands:this.selected_brands,
        tags:this.selected_tags
      }

      this.$store.commit('merchant/set_filter_clause', d )
    }
  }
}
</script>
