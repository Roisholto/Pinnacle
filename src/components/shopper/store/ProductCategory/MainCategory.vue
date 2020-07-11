<template lang="html">
  <v-sheet color="transparent">
    <v-row>
      <div :style="{height:height}" style="overflow-y:auto" class="col-3 col-sm-2 px-0">
        <v-item-group v-model="cTab"
          mandatory
          class=""
          tag="v-flex">

          <!--<v-tab v-for="item in categoryMenu" :key="item.id">
            {{item.name}}
          </v-tab>-->


          <v-item
          v-for="item in categoryMenu"
          :key="item.id"
          v-slot:default="{ active, toggle }"
          >

            <a
              class="caption
              text-capitalize
              mb-1
              text-wrap text-center
              d-flex justify-center
              align-center
              white
              "
              :class="[active ? 'primary--text' : 'black--text']"
              block
              text
              tile
              tag="a"
              :input-value="active"
              @click.prevent="toggle"
              style="height:60px"
              :style="{boxShadow: active ? 'inset 3px 0 0 0 currentColor' : null}"
            >

              {{item.name}}

              <!--<v-icon>mdi-record</v-icon>-->
            </a>

          </v-item>
        </v-item-group>
      </div>

      <v-col class="flex-grow-1 py-0 px-0">
        <v-window
        v-model="cTab"
        class="elevation-0"
        vertical
        >
          <v-window-item
          v-for="item in categoryMenu"
          class="transparent px-2"
          :key="item.id"
          >
            <SubCategory :category="item" @route-changed="$emit('route-changed')"/>
          </v-window-item>
        </v-window>
      </v-col>

      <!--<v-tab-item v-for="item in categoryMenu" :key="item.id" class="transparent px-2">
        <v-btn block class="d-flex justify-space-between" color="white">
          All products
          <div>
            <v-icon>
              mdi-chevron-right
            </v-icon>
          </div>
        </v-btn>

        <div class="py-1"></div>
        <SubCategory :category="item"/>
      </v-tab-item>-->
    </v-row>
  </v-sheet>
</template>
<script>
import {mapState} from 'vuex' ;
import SubCategory from './SubCategory.vue' ;

export default {
  name:"MainCategory",

  data(){
    return {
      cTab:0
    }
  },

  computed:{
    height(){
      return (this.$vuetify.breakpoint.height -
        this.$store.state.ui.appHeaderHeight -
        this.$store.state.ui.storeInfoHeight).toString()+'px';
    },
    ...mapState({
      categorys: function (state) {
        let a = [{count:0, id:0, image:null, name:"all"}] ;
        a.push(...state.merchant.inventory.categorys)
        return a ;
      },

      categoryMenu:function(state){
        return state.merchant.pageComponents.menus.product_category
      }
    })
  },

  components:{
    SubCategory
  }
}
</script>
