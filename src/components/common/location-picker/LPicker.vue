// https://www.npmjs.com/package/vue2-location-picker
<template>
    <div class="map_container">
        <div id="map" style=""></div>
        <input type="text" class="controls" id="pac-input"/>
    </div>
</template>

<script>
export default {
  name: 'LPicker',
  props: {
    options: {
      type: Object,
      required: false,
      default () {
        return {
          map: {/** other map options **/},
          marker: {/** marker options **/},
          autocomplete: {/** autocomplete options **/}
        }
      }
    },
    value: {
      type: Object,
      required: false,
      default () {
        return { lat: 6.516875060149681, lng: 3.3896770439941974 }
      }
    }
  },
  data () {
    return {
      map: null,
      marker: null,
      autocomplete: null,
      val: {lat: 6.516875060149681, lng: 3.3896770439941974 },
      address: '',
      geocoding: false

    }
  },
  components: {},
  methods: {
    geocodeLocation (e) {
      //console.log('marker', this.marker);
      const geocoder = new google.maps.Geocoder();
      let position = this.marker.getPosition() ;
      let latlng = {lat:position.lat(),lng:position.lng()}
      let vm = this ;
      vm.val = latlng ; //{ lat: this.marker.getPosition().lat(), lng: this.marker.getPosition().lng() }
      vm.map.setCenter(this.val)
      vm.map.panTo(this.val)

      this.geocoding = true ;
      geocoder.geocode({location:latlng}, function(result, status){
          // console.log('lat lng', result, status)
          if(status=='OK')
            {
            vm.address = result[0].formatted_address ;
            vm.emitLocation()

            }

        vm.geocoding = false ;
      })

    },
    moveMarker () {
      // document.getElementById('pac-input').value = ''
      let place = this.autocomplete.getPlace()

      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'")
        return
      }
      this.map.setCenter(place.geometry.location)
      this.map.setZoom(14)
      this.marker.setPosition(place.geometry.location)
      this.marker.setVisible(true)
      this.val = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
      this.address = place
        ? place.formatted_address.indexOf(place.name) == -1
          ? place.name + ', ' + place.formatted_address : place.formatted_address
        : ''

      this.emitLocation()
    },
    emitLocation () {
      let position = this.marker.getPosition()
      let addr = {}

      addr.coords = position.toJSON()
      addr.full_address = this.address

      this.$emit('input', addr)
    }
  },
  watch: {
      geocoding:function(v){
          this.$emit('geocoding', v)
      },

    value: function (newValue, oldValue) {
      if (newValue != undefined && typeof newValue === 'object' && newValue.lat && newValue.lng) {
        this.val = newValue
        this.map.setCenter(newValue)
        this.map.setZoom(14)
        this.marker.setPosition(newValue)
        // console.log('value will trigger', newValue, oldValue)
        // this.emitLocation()
        // this.$emit('input', this.val)
      }
    }
  },
  mounted () {
    // should probably put this in a try catch
    const vm = this

    this.$nextTick()
      .then(function () {
        if (!(vm.value == null || vm.value == undefined || typeof vm.value !== 'object' || (typeof vm.value === 'object' && (!vm.value.lat || !vm.value.lng)))) {
          vm.val = vm.value
        }

        let allOptions = Object.assign({}, vm.options)
        let mapOptions = {}
        if (allOptions.map) {
          mapOptions = allOptions.map
        }
        // if (!vm.options.map) vm.options.map = {}
        if (!vm.options.marker) vm.options.marker = {}
        if (!vm.options.autocomplete) vm.options.autocomplete = {}
        // vm.$emit('input', vm.val)
        mapOptions.center = vm.val
        // console.log('map options', mapOptions)
        let input = document.getElementById('pac-input')
        vm.map = new google.maps.Map(document.getElementById('map'), Object.assign({
          center: { lat: 0, lng: 0 },
          zoom: 8,
          disableDefaultUI: true,
          fullscreenControl: true
        }, mapOptions))

        vm.marker = new google.maps.Marker(Object.assign({
          map: vm.map,
          position: vm.map.getCenter(),
          draggable: true
        }, vm.options.marker))

        vm.autocomplete = new google.maps.places.Autocomplete(input, vm.options.autocomplete)
        vm.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input)
        // events
        vm.marker.addListener('dragend', vm.geocodeLocation)
        vm.autocomplete.addListener('place_changed', vm.moveMarker)
      })

    // this.emitLocation() ;
  }
}
</script>
<style>
    .map_container, #map {
        min-height: 200px;
        height: 100%;
        width: 100%;
    }

    .pac-card {
        margin: 10px 10px 0 0;
        border-radius: 2px 0 0 2px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        outline: none;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        background-color: #fff;
    }

    #pac-container {
        padding-bottom: 12px;
        margin-right: 12px;
    }

    .pac-container {
        z-index: 9999
    }

    .pac-controls {
        display: inline-block;
        padding: 5px 11px;
    }

    .pac-controls label {
        font-size: 13px;
        font-weight: 300;
    }

    #pac-input {
        padding: 7px 14px;
        margin: 10px;
        width: 30%;
        min-width: 300px;
        font-size: 15px;
        font-weight: 300;
        text-overflow: ellipsis;
        border: 0;
        border-radius: 2px 0 0 2px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, .3);
    }

    #pac-input:focus {
        border-color: #4d90fe;
    }
</style>
