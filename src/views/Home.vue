<template>
  <b-container>
    <b-row>
      <b-col>
        Hello vergas!!
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button id="show-btn" @click="openModal('create')">Agregar</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          id="my-table"
          responsive
          :items="cars"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields"
          small
        >
          <template v-slot:cell(actions)="row">
            <b-button variant="info" :disabled="row.item.id_user !== parseInt(getUser.id_user)" size="sm" @click="openModal('update')" class="mr-1">
              Actualizar
            </b-button>
            <b-button variant="danger" size="sm" @click="row.toggleDetails">
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

        <p class="mt-3">Current Page: {{ currentPage }}</p>
      </b-col>
    </b-row>
    <b-button @click.prevent="updateCarLocation">
      Test
    </b-button>

    <b-modal id="bv-modal-example" hide-footer>
      <CarForm :type='actionForm' />
    </b-modal>
  </b-container>
</template>

<script>
import CarForm from '@/components/CarForm.vue'
export default {
  name: 'Home',
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
      actionForm: 'create'
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
    },
    openModal (action) {
      this.actionForm = action
      this.$bvModal.show('bv-modal-example')
    }
  }
}
</script>
