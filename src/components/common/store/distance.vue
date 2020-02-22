<template>
    <span ref="el">
        <v-progress-linear color="primary" indeterminate class="" v-if="requesting"/>
        <span v-else> about <span class="" style="font-weight:600">{{d_dist}}</span> away</span>
    </span>
</template>

<script>

export default {
  name: 'distance',
  props: {
    coords: Object,
    currentLocation: Object,
    distance: [String, Number],
    storeDistance:{
        type:Boolean,
        default:false
    }
  },
  data: function () {
    return {
      d_dist: 'None',
      resp: {},
      requesting: false
    }
  },
  mounted: function () {
     let cc = this.$store.getters['user/getDistanceCalc'](
        this.prep_origin_distance_key(this.currentLocation,this.coords) )

    if (this.distance)
        {
        this.d_dist = this.distance
        }
    else if(cc)
        {
        this.d_dist = cc ;
        }
    else
        {
        let options = {
            rootMargin: '0px',
            threshold: 1.0
            }
        let vm = this
        let intersected = false
        let callback = function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let elem = entry.target

                    if (entry.intersectionRatio >= 0.75) {
                        if (!intersected) {
                            vm.calc_dist()
                        }
                        // observe.unobserve(vm.$refs.el) ;
                        intersected = true
                    }
                }
            })
        }

      let observer = new IntersectionObserver(callback, options)
      let target = this.$refs.el
      observer.observe(target)
    }
  },
  components: {

  },
  methods: {
    calc_dist:function(){
        if (!this.test_coords) { return }
        // if()
        if(process.env.NODE_ENV == 'development')
            {
            //return
            }

        this.calc_h_dist()
    },
    prep_origin_distance_key:function($origin,$dest){
        // console.log()
        return `${$origin.lat},${$origin.lng}-${$dest.lat},${$dest.lng}` ;
    },
    // should call from calc_dist
    calc_g_dist: function () {
      let $key = process.env.VUE_APP_GOOGLE_MAP_KEY
      let $origin = `${this.currentLocation.lat},${this.currentLocation.lng}`

      let $dest = `${this.coords.lat},${this.coords.lng}`
      let url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${$origin}&destinations=${$dest}&key=${$key}`
      let vm = this

      fetch(url, { mode: 'cors' })
        .then(function (resp) {
          return resp.json()
        })
        .then(function (resp) {
          console.log('resp', resp)
          vm.resp = resp
        })
        .catch(function (e) {
          console.log('e', e)
        })
        .finally(function () {

        })
    },
    calc_h_dist: function () {
      let app_id = process.env.VUE_APP_HERE_MAP_APP_ID
      let app_code = process.env.VUE_APP_HERE_MAP_APP_CODE
      let $origin = `${this.currentLocation.lat},${this.currentLocation.lng}`
      let $dest = `${this.coords.lat},${this.coords.lng}`
      let url = 'https://route.api.here.com/routing/7.2/calculateroute.json?waypoint0=' + `${$origin}` +
            '&waypoint1=' + `${$dest}` +
            '&mode=fastest;car;traffic:disabled' +
            '&app_id=' + app_id +
            '&app_code=' + app_code +
            '&departure=now'

      let vm = this
      vm.requesting = true
      fetch(url)
        .then(function (resp) {
          return resp.json()
        })
        .then(function (resp) {
          vm.resp = resp

          if (resp.response)
            {
            vm.d_dist = (resp.response.route[0].summary.distance / 1000).toString() + ' km'
            if(vm.storeDistance)
                {
                let key_ = $origin+'-'+$dest ;
                let a = {}
                a[key_] = vm.d_dist
                vm.$store.commit('user/add_calculated_distance',a)
                }
            }

        })
        .catch(function (e) {
          console.log('e', e)
        })
        .finally(function () {
          vm.requesting = false
        })
    },
    test_coords: function () {
      return this.coords && this.coords.lat && this.currentLocation.lat
    }
  }
}
</script>
