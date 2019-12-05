<template>
  <div>
    <home-header></home-header>
    <home-body></home-body>
  </div>
</template>

<script>
import HomeHeader from './components/homeHeader'
import HomeBody from './components/homeBody'
export default {
  name: 'Home',
  components: {
    HomeHeader, HomeBody
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
