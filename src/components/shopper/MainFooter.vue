<template>
  <v-footer
    dark
    padless
    >
    <v-card
      flat
      tile
      class="white--text text-center"
      style="width:100%"
    >
      <!--<v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>-->

      <v-card-text class="white--text pt-0 text-left" style="width:100%">
        <div class="row flex-sm-row-reverse">
          <div class="col-md-4">

          </div>

          <div class="col-md-8">
            <div class="row">
              <div class="col d-flex flex-column" v-for="(items, i) in links" :key="items.header">

                <v-list dense>
                  <v-list-item color="primary " class="font-weight-bold primary--text" >
                    <span class="primary--text lighten-1">{{items.header}}</span>
                  </v-list-item>
                  <v-list-item
                    exact
                    :href="item.href ? item.href : null"
                    :to="item.to && !item.href? item.to : null"
                    v-for="(item, j) in items.items"
                    :key="j"
                    >
                    <span class="text-capitalize caption">
                      {{item.text}}
                    </span>
                  </v-list-item>
                </v-list>
              </div>
            </div>
          </div>

        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong class="mr-3">{{appName}}</strong>
        <a href="#">Credits</a>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
  export default {
    name:"MainFooter",
    data: () => ({
      appName:process.env.VUE_APP_APP_NAME,
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
      links:[
        {
          header:'Help & Information',
          items:[
            {text:'Contact us', to:{name:'merchant-contact'}},
            {text:'Find stores', to:{name:'merchant-contact'}},
            {text:'FAQ', to:{name:'merchant-pages', params:{id:'faq'}}}
          ]
        },
        {
          header:'Corporate',
          items:[
            {text:'About us', to:{name:'merchant-pages', params:{id:'about-us'}}},
            {text:'Corporate responsibility', to:{name:'merchant-pages', params:{id:'csr'}}},
            {text:'Jobs', to:{name:'merchant-pages', params:{id:'jobs'}} },

          ]
        },
        {
          header:'Terms',
          items:[
            {text:'terms of use', to:{name:'merchant-pages', params:{id:'terms-of-use'}}},
            {text:'terms & condition', to:{name:'merchant-pages', params:{id:'terms&condition'}} },
            {text:'privacy policy', to:{name:'merchant-pages', params:{id:'privacy-policy'}} },
            {text:'cookie policy', to:{name:'merchant-pages', params:{id:'cookie-policy'}} },
          ]
        },
      ]
    }),
  }
</script>
