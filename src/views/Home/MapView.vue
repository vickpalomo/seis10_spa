<template>
  <b-container>
    <b-row>
      <gmap-map
          :center="center"
          :zoom="12"
          style="width:100%;  height: 400px;"
      >
        <gmap-marker
          :key="mark.position.lat + mark.position.lng + mark.id"
          v-for="(mark) in markersAux"
          :position="mark.position"
          @click="center=mark.position"
        ></gmap-marker>
      </gmap-map>
    </b-row>
  </b-container>
</template>
<script>
import io from 'socket.io-client'
export default {
  data () {
    return {
      center: { lat: 20.963452, lng: -89.5536305 },
      markers: [],
      socket: io(process.env.VUE_APP_API_URI)
    }
  },
  computed: {
    markersAux () {
      return this.markers
    }
  },
  mounted () {
    this.axios.defaults.headers.common.Authorization = 'Bearer ' + this.$store.state.authorization
    this.axios.get('/cars')
      .then((data) => {
        const aux = data.data.map((car) => {
          return {
            id: car.id,
            position: {
              lat: parseFloat(car.lat),
              lng: parseFloat(car.lng)
            }
          }
        })
        console.log('Aux', JSON.stringify(aux))
        this.markers = aux
        console.log(this.markers)
      })
      .catch((err) => {
        console.log(err)
      })
    this.socket.on('updateLocationCar', (data) => {
      this.updateLocationCar(data)
    })
    this.$forceUpdate()
  },
  beforeDestroy () {
    this.socket.close()
  },
  methods: {
    geolocate () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    },
    updateLocationCar (data) {
      const index = this.markers.findIndex((item) => item.id === data.id)
      if (index !== -1) {
        this.markers[index] = data
      } else {
        this.markers = [...this.markers, data]
      }
      this.$forceUpdate()
    }
  }
}
</script>
