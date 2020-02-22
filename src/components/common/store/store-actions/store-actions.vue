<template>
    <v-menu :close-on-content-click="false" theme="light" v-model="showMenu" ref="tooltip">
        <template v-slot:activator={on}>
            <v-btn class="" icon v-on="on">
                <v-icon color="grey">
                    mdi-dots-vertical
                </v-icon>
            </v-btn>
        </template>
        <template v-if="processing">
            <ldsRing/>
        </template>
        <template v-else>
            <v-list dense>
                <v-list-item>
                    <save class="" v-bind:mid="mid" v-on:process-status="[running_task.save = $event, task_complete()]"/>
                </v-list-item>
                <v-divider class="my-0"/>
                <v-list-item>
                    <share class="pa-2 cursor-pointer" v-bind:mid="mid" :name="storeName">Share</share>
                </v-list-item>
            </v-list>
        </template>
    </v-menu>
</template>
<script>
import jBox from 'jbox'
import save from './save.vue'
import share from './share.vue'
export default {
  name: 'storeActions',
  props: {
    mid: {
      type: String,
      required: true
    },
    // needed by the share component
    storeName:{
        type:String,
        required:true,
        default:()=>''
    }

  },
  data: function () {
    return {
        showMenu:false,
      processing: false,
      running_task: {
        save: false,
        share: false
      }
    }
  },
  computed: {
  },
  components: {
    save,
    share
  },
  beforeDestroy: function () {
    this.hideTooltip()
  },
  methods: {
    hideTooltip: function () {
      this.showMenu = false ;
    },

    task_complete: function () {
      console.log('calling task complete', this.$data)
      if (!this.running_task.save && !this.running_task.share) { this.hideTooltip() }
    },
    share: function () {
      let vm = this
      console.log('share', vm.mid)
      this.hideTooltip()
    }
  }
}
</script>

<style lang="scss" scoped="true">
/*a.menu{

    &:hover{
        background: #eaedef;
        border-radius:20% ;

        i {

        }

    }

    i {
        font-size:14px ;
    }
}*/
</style>
