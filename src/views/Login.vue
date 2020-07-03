<template>
  <div class="seis10__login">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/" class="ml-5">seis10</b-navbar-brand>
    </b-navbar>

    <b-container fluid>
      <b-row align-h="center" class="mt-5">
        <b-col cols="12" sm="6">
          <b-card>
            <b-form @submit.prevent="login" class="text-left">
              <b-form-group
                id="email-group"
                label="Email:"
                label-for="email"
                label-class="font-weight-bold pt-0"
              >
              <b-form-input
                id="email"
                v-model="loginData.email"
                type="email"
                required
                placeholder="Ingresa tu correo"
              ></b-form-input>
              </b-form-group>

              <b-form-group
                id="password-group"
                label="Password"
                label-for="password"
                label-class="font-weight-bold pt-0"
              >
              <b-form-input
                id="password"
                v-model="loginData.password"
                type="password"
                required
                placeholder="Ingresa tu contraseña"
              ></b-form-input>
              </b-form-group>

              <b-form-group class="text-center">
                <b-button type="submit" variant="success">
                  Iniciar sesión
                </b-button>
              </b-form-group>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginData: { email: '', password: '' }
    }
  },
  methods: {
    login () {
      this.axios.post('/login', this.loginData)
        .then((data) => {
          this.$store.dispatch('setAuthorizationToken', data.data.token)
          this.$store.dispatch('setUser', { name: data.data.name, role: data.data.role, id_user: data.data.id_user })
          this.$router.push({ name: 'Home' })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>

</style>
