<template>
  <div class="seis10__home">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/" class="ml-5">seis10 </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Cars' }" exact>Cars</b-nav-item>
          <b-nav-item :to="{ name: 'Maps' }" exact>Maps</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-button variant="danger" type="button" @click.prevent="logout()">
            Cerrar sesión
          </b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container fluid>
      <router-view />
    </b-container>
  </div>
</template>
<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
