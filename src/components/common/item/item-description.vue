<template>
    <div class="">

        <v-expansion-panels  class="no-padding" light>
            <v-expansion-panel >
              <v-expansion-panel-header><span class="font-weight-bold">Product info</span></v-expansion-panel-header>
              <v-expansion-panel-content class="">
                  <template v-if="!description.length">
                      <span class="small body-2">Product description not found</span>
                  </template>
                  <template v-else>
                      <div class="d-flex flex-column dotted-spaced-bottom py-2" v-for="item in description">
                          <div class="text-capitalize" style="font-weight:550">{{item.title}}</div>
                          <div class="body-2">{{item.content}}</div>
                      </div>
                  </template>
              </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

    </div>
</template>
<script>
export default {
  name: 'itemDescription',
  props: {
    description: {
      type: Array,
      required: true
    }
  }

}
</script>

<style lang="scss">
.no-padding {
    .v-expansion-panel--active
        {
        .v-expansion-panel-content__wrap,
         .v-expansion-panel-header
            {
            padding: 0 8px 8px
            }
        }

    .v-expansion-panel-content__wrap,
     .v-expansion-panel-header
        {
        padding: 0 8px 0px
        }
}
</style>
