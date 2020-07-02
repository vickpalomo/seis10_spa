<template>
  <b-container>
    <b-row>
      <b-col>
        Hello vergas!!
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
          small
        ></b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>

        <p class="mt-3">Current Page: {{ currentPage }}</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      currentPage: 1,
      perPage: 5,
      items: []
    }
  },
  computed: {
    rows () {
      return this.items.length
    },
    cars () {
      return this.items
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
  }
}
</script>
