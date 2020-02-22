<template>
    <div class="d-flex body-2 py-1">
        <div class="px-2  col-6 text-capitalize">
            {{day}}
        </div>
        <div class="col-6 px-2">
            <template v-if="times.length">
                <div class="d-flex" v-for="time in times">
                    <div class="px-2">{{readable_time(time.open)}}</div>
                    <div class="px-2">{{readable_time(time.close)}}</div>
                </div>
            </template>
            <template v-else>
                <div> - </div>
            </template>
        </div>
    </div>
</template>
<script>
import moment from 'moment'

export default {
  name: 'singleDay',
  props: {
    day: String,
    times: Array
  },
  computed: {

  },
  methods: {
    readable_time: function (t) {
      return moment().startOf('day').add(t, 'seconds').format('h:ssa')
    }
  }
}
</script>
