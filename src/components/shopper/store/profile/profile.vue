<template>
    <storeLayout>
        <div>
            <h3 class="title">Image Gallery</h3>
            <div class="text-center" style="min-height:120px;">
                <div style="padding-top:50px">
                    Images not found for this merchant
                </div>
            </div>
        </div>
        <v-sheet class="pa-3" elevation="1">
            <h3 class="title mb-2">Opening Hours</h3>
            <openingHours />
        </v-sheet>
    </storeLayout>
</template>
<script>
import openingHours from './opening-hours.vue'
import storeLayout from '@/layouts/storeLayout.vue' ;

export default {
  name: 'profile',
  components: {
    openingHours,
    storeLayout
  }

}
</script>
