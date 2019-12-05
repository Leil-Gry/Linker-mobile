<template>
  <div>
    <warn-header></warn-header>
    <warn-body></warn-body>
  </div>
</template>

<script>
import WarnHeader from './components/warnHeader'
import WarnBody from './components/warnBody'
export default {
  name: 'Warn',
  components: {
    WarnHeader, WarnBody
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
