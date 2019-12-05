<template>
  <div class='hello'>
    <search-header></search-header>
    <search-body></search-body>
  </div>
</template>

<script>
import SearchHeader from './components/searchHeader'
import SearchBody from './components/searchBody'
export default {
  name: 'Search',
  components: {
    SearchHeader, SearchBody
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
