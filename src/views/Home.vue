<template>
  <b-container>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">seis10 </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Cars' }" exact>Cars</b-nav-item>
          <b-nav-item :to="{ name: 'Maps' }" exact>Maps</b-nav-item>
        </b-navbar-nav>
</b-collapse>
  </b-navbar>
  <router-view />
  </b-container>
</template>
