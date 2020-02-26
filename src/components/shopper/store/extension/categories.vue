<template>
  <v-menu dense :offset-y="true">
    <template v-slot:activator="{ on }">
      <v-btn
        text
        dark
        v-on="on"
      >
        Shop Groceries
        <v-icon>
          mdi-chevron-down
        </v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item
        v-for="(item, index) in categorys"
        :key="index"
        :to="{ name: 'store-category', params: { category: item.name } }"
      >
        <v-list-item-title class="text-capitalize"> {{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import {mapState} from 'vuex' ;

export default{
  name:"CategoryMenu",
  computed:{
    ...mapState({
      categorys: function (state) {
        let a = [{count:0, id:0, image:null, name:"all"}] ;
        a.push(...state.merchant.inventory.categorys)
        return a ;

      }
    })
  }
}
</script>
