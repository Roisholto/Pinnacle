 <template>
  <v-sheet class="py-8" elevation="">
    <div class="mb-4">
      <h3 class="text-center title">Need help ?</h3>
    </div>
    <div  class="row justify-center ">
      <a href="javascript:;" @click="show_opening = true" class="col d-flex flex-column border-right px-4">
        <v-icon size="80" color="">
          mdi-clock-check-outline
        </v-icon>
        <v-btn text depressed color="primary">
          Find store opening hours
        </v-btn>
      </a>
      <router-link :to="{ name: 'merchant-contact' }" class="col d-flex flex-column px-4 px-4">
        <v-icon size="80" color="">
          mdi-card-account-mail-outline
        </v-icon>
        <v-btn text depressed color="primary">
          Contact us
        </v-btn>
      </router-link>
    </div>
    <v-dialog v-model="show_opening" max-width="800">
      <v-card>
        <v-card-title>
          Opening hours
        </v-card-title>
        <v-card-text>
          <OpeningHours />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="show_opening = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>
<script>
import OpeningHours from '../profile/opening-hours.vue' ;
export default{
  name:"NeedHelp",

  data(){
    return {
      show_opening:false
    }
  },

  components:{
    OpeningHours
  },

  methods:{
    showOpening(){

    }
  }
}
</script>
