<template>
  <div>
    <router-view></router-view>
    <navbar/>
  </div>
</template>

<script>
import Navbar from './Navbar'
export default {
  name: 'index',
  components: {
    Navbar
  }
}
</script>

<style scoped>
</style>
