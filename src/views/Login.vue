<template>
  <b-container>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">seis10</b-navbar-brand>
        </b-navbar>
    </div>
    <b-row align-h="center">
      <b-col cols="6">
        <b-form @submit.prevent="login">
          <b-form-group
            id="email-group"
            label="Email:"
            label-for="email"
          >
          <b-form-input
            id="email"
            v-model="loginData.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
          </b-form-group>

          <b-form-group
            id="password-group"
            label="Password"
            label-for="password"
          >
          <b-form-input
            id="password"
            v-model="loginData.password"
            type="password"
            required
          ></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-button type="submit" variant="success">
              Login
            </b-button>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
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
