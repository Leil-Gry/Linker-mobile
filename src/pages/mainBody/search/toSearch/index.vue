<template>
  <div class='hello'>
    <to-search-header></to-search-header>
    <to-search-body></to-search-body>
  </div>
</template>

<script>
import ToSearchHeader from './components/toSearchHeader'
import ToSearchBody from './components/toSearchBody'
export default {
  name: 'Search',
  components: {
    ToSearchHeader, ToSearchBody
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
