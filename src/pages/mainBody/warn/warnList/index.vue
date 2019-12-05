<template>
  <div class='hello'>
    <warn-list-header></warn-list-header>
    <warn-list-body></warn-list-body>
  </div>
</template>

<script>
import WarnListHeader from './components/warnListHeader'
import WarnListBody from './components/warnListBody'
export default {
  name: 'Device',
  components: {
    WarnListHeader, WarnListBody
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
