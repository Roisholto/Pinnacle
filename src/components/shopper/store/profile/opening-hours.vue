<template>
    
    <div>
        <singleDay :class="[current_day == 'monday' ? 'primary lighten-3 rounded' : '']" :day="'monday'" :times="get_day('monday')" />
        <singleDay :class="[current_day == 'tuesday' ? 'primary lighten-3 rounded' : '']" :day="'tuesday'" :times="get_day('tuesday')" />
        <singleDay :class="[current_day == 'wednesday' ? 'primary lighten-3 rounded' : '']" :day="'wednesday'" :times="get_day('wednesday')" />
        <singleDay :class="[current_day == 'thursday' ? 'primary lighten-3 rounded' : '']" :day="'thursday'" :times="get_day('thursday')" />
        <singleDay :class="[current_day == 'friday' ? 'primary lighten-3 rounded' : '']" :day="'friday'" :times="get_day('friday')" />
        <singleDay :class="[current_day == 'saturday' ? 'primary lighten-3 rounded' : '']" :day="'saturday'" :times="get_day('saturday')" />
        <singleDay :class="[current_day == 'sunday' ? 'primary lighten-3 rounded' : '']" :day="'sunday'" :times="get_day('sunday')" />
    </div>

</template>
<script>
import singleDay from './single-day.vue' ;
import moment from 'moment' ;

export default {
  name: 'openingHours',
  props: {

  },
  data: function () {
    return {

    }
  },
  computed: {
    opening_hours: function () {
      return this.$store.state.merchant.pref.business_hours
    },
    current_day:function(){
        return moment().format('dddd').toLowerCase();
    }
  },
  components: {
    singleDay
  },
  methods: {
    get_day: function (day) {
      let opening = this.opening_hours[day]
      return opening || []
    }
  }
}
</script>
