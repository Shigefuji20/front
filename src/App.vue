<script setup>
import { RouterView } from 'vue-router'
import Nav from './components/Nav.vue'
</script>

<script>
export default {
  components:{
    Nav
  }
}
</script>
<template>
  <Nav></Nav>

  <div class="container">
    <RouterView/>
  </div>
</template>

<style>
@import url("../node_modules/bootstrap/dist/css/bootstrap.min.css");
</style>
