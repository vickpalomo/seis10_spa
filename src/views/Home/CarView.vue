<template>
  <b-container>
    <b-row>
      <b-col class="mt-5">
        <h1 class="text-light">
          Catálogo de Automoviles
        </h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-right mt-0">
        <b-button id="show-btn" @click="openModal('create')" variant="success">Agregar</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card class="mt-2 mb-2">
          <b-table
            id="my-table"
            responsive
            :items="cars"
            :per-page="perPage"
            :current-page="currentPage"
            :fields="fields"
            striped
          >
            <template v-slot:cell(actions)="row">
              <b-button variant="info" :disabled="row.item.id_user !== parseInt(getUser.id_user)" size="sm" @click="openModal('update', row.item)" class="mr-1">
                Actualizar
              </b-button>
              <b-button variant="danger" :disabled="row.item.id_user !== parseInt(getUser.id_user)"  size="sm" @click="deleteCar(row.item.id)">
                Eliminar
              </b-button>
            </template>
          </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            align="center"
            aria-controls="my-table"
          ></b-pagination>
        </b-card>

      </b-col>
    </b-row>

    <b-modal id="bv-modal-example" hide-footer :title="modalTitle">
      <CarForm :type='actionForm' @created="appendNewCar" @updated="updateCarItem" :dataCar="car" />
    </b-modal>
  </b-container>
</template>

<script>
import CarForm from '@/components/CarForm.vue'
export default {
  components: {
    CarForm
  },
  data () {
    return {
      currentPage: 1,
      perPage: 5,
      items: [],
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'plates', label: 'Placas' },
        { key: 'brand', label: 'Marca' },
        { key: 'color', label: 'Color' },
        { key: 'model', label: 'Modelo' },
        { key: 'lat', label: 'Latitud' },
        { key: 'lng', label: 'Longitud' },
        { key: 'id_user', label: 'Id User' },
        { key: 'actions', label: 'Acciones' }
      ],
      actionForm: 'create',
      carAux: {
        brand: '',
        model: '',
        color: '',
        plates: ''
      }
    }
  },
  computed: {
    rows () {
      return this.items.length
    },
    cars () {
      return this.items
    },
    getUser () {
      return this.$store.state.user
    },
    car () {
      return this.carAux
    },
    modalTitle () {
      return this.actionForm === 'create'
        ? 'Agregar nuevo vehículo'
        : 'Actualizar vehículo'
    }
  },
  mounted () {
    this.axios.defaults.headers.common.Authorization = 'Bearer ' + this.$store.state.authorization
    this.axios.get('/cars')
      .then((data) => {
        this.items = data.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    updateCarLocation () {
      this.items[0].plates = 'YYY-90-12'
    },
    appendNewCar (car) {
      this.items = [...this.items, car]
      this.$bvModal.hide('bv-modal-example')
    },
    openModal (action, data = null) {
      if (data !== null) this.carAux = data
      this.actionForm = action
      this.$bvModal.show('bv-modal-example')
    },
    updateCarItem (car) {
      const index = this.items.findIndex((item) => item.id === car.id)
      this.items[index] = car
      this.$bvModal.hide('bv-modal-example')
      this.carAux = {
        brand: '',
        model: '',
        color: '',
        plates: ''
      }
    },
    deleteCar (id) {
      this.axios.delete(`/cars/${id}`)
        .then((data) => {
          const index = this.items.findIndex((item) => item.id === id)
          this.items.splice(index, 1)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
