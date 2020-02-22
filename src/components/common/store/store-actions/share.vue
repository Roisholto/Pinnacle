<template>
    <div>
        <div class="cursor-pointer" @click="share">Share</div>

        <v-dialog v-model="showDialog" max-width="35rem">
            <v-card>
                <v-card-title>
                    <h3 class="headline">Share link to store</h3>
                </v-card-title>
                <v-card-text>
                    <div class="d-flex align-bottom">

                        <div class="flex-fill mr-2">
                            <v-text-field v-bind:value="url" readonly/>
                        </div>
                        <div><!-- should hide button if clipboard not supported -->
                            <v-btn color="primary" v-on:click.stop="copy">
                                Copy
                            </v-btn>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
// import jBox from 'jbox' ;
import 'jbox/Source/plugins/Notice/jBox.Notice.js'

export default {
  name: 'share',
  props: {
    mid: String,
    name: String

  },
  data: function () {
    return {
      showDialog: false,
      }
  },
  computed: {
    url: function () {
      return this.getUrl()
    }
  },

  methods: {
    share: function () {
      let vm = this

      if (navigator.share)
        {
        navigator.share({
            title: 'Am sharing ' + this.name,
            text: 'Check out '+this.name+' on directbuy.ng',
            url: this.url
            })
        }
    else
        {
        this.showDialog = true
        }
    },
    copy: function () {
        let vm = this ;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.url)
          .then(function (res) {
            new jBox('Notice', {
              'content': 'link copied',
              color: 'blue',
              showCountDown: true,
              position: {
                y: 'bottom',
                x: 'left'
              }
            })
            vm.showDialog = false ;
            console.log()
          })
          .catch(function (res) {
            console.log('error, copying')
          })
      } else {
        console.log('clipboard not available')
      }
    },
    getUrl: function () {
      let url = this.$router.resolve({
        name: 'store',
        params: { storeid: this.mid }
      })

      console.log('url', url)
      url = location.origin + url.href
      return url
    }
  }
}
</script>
