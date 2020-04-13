<template>
  <div class="row">
    <div class="col-md-4  py-4" v-if="contact.phone.length">
      <v-hover>
        <template v-slot="{ hover }">
          <v-card :elevation="hover ? 8 : 4" shaped>
            <v-card-title>
              <v-icon color="primary " class="mr-3">
                mdi-phone
              </v-icon>
              <span class="primary--text">Call us</span>

            </v-card-title>
            <v-list two-line>
              <v-list-item :href="'tel:'+item.value" v-for="(item, index) in contact.phone" :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{item.label}}</v-list-item-title>
                  <v-list-item-subtitle class="primary--text darken-4 body-1">{{item.value}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </template>
      </v-hover>
    </div>
    <div class="col-md-4 py-4" v-if="contact.mail.length">
      <v-hover>
        <template v-slot="{ hover }">
          <v-card :elevation="hover ? 8 : 4" shaped>
            <v-card-title>
              <v-icon color="primary " class="mr-3">
                mdi-email
              </v-icon>
              <span class="primary--text">Send us a mail</span>

            </v-card-title>
            <v-list two-line>
              <v-list-item :href="'mailto:'+item.value" v-for="(item, index) in contact.mail" :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{item.label}}</v-list-item-title>
                  <v-list-item-subtitle class="primary--text darken-4 body-1">{{item.value}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </template>
      </v-hover>
    </div>
    <div class="col-md-4 py-4" v-if="contact.address.length">
      <v-hover>
        <template v-slot="{ hover }">
          <v-card :elevation="hover ? 8 : 4" shaped>
            <v-card-title>
              <v-icon color="primary " class="mr-3">
                mdi-map-marker
              </v-icon>
              <span class="primary--text">Branch address</span>

            </v-card-title>
            <v-list two-line>
              <v-list-item v-for="(item, index) in contact.address" :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{item.label}}</v-list-item-title>
                  <div class="primary--text darken-4 body-1" style="line-height:1.2">{{item.full_address}}</div>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </template>
      </v-hover>
    </div>
  </div>
</template>
<script>
export default {
  name:"AlternateContact",

  computed:{
    contact(){
      return this.$store.getters['merchant/pageComponents/altContact/get_contact'] ;
    }
  }
}
</script>
