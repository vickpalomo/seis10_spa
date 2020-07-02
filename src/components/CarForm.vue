<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form @submit.prevent="">
          <b-form-group
            id="brand-group"
            label="Marca:"
            label-for="brand"
          >
          <b-form-input
            id="brand"
            v-model="car.brand"
            type="text"
            required
          ></b-form-input>
          </b-form-group>

          <b-form-group
            id="model-group"
            label="Modelo:"
            label-for="model"
          >
          <b-form-input
            id="model"
            v-model="car.model"
            type="text"
            required
          ></b-form-input>
          </b-form-group>

          <b-form-group
            id="color-group"
            label="Color:"
            label-for="color"
          >
          <b-form-input
            id="color"
            v-model="car.color"
            type="text"
            required
          ></b-form-input>
          </b-form-group>

          <b-form-group
            id="plates-group"
            label="Placas:"
            label-for="plates"
          >
          <b-form-input
            id="plates"
            v-model="car.plates"
            type="text"
            required
          ></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-button type="button" variant="success" @click.prevent="type === 'create' ? createCar : updateCar">
              {{ type === 'create' ? 'Guardar' : 'Actualizar' }}
            </b-button>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: () => 'create'
    },
    dataCar: {
      type: Object,
      default: () => {
        return {
          brand: '',
          model: '',
          color: '',
          plates: ''
        }
      }
    }
  },
  data () {
    const self = this
    return {
      car: self.dataCar
    }
  },
  methods: {
    createCar () {
      this.axios.post('/cars', this.car)
        .then((data) => {
          this.$emit('created', data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateCar () {
      this.axios.patch('/cars', this.car)
        .then((data) => {
          this.$emit('updated', data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
