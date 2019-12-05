<template>
  <div class='hello'>
    <device-header></device-header>
    <device-body></device-body>
  </div>
</template>

<script>
import DeviceHeader from './components/deviceHeader'
import DeviceBody from './components/deviceBody'
export default {
  name: 'Device',
  components: {
    DeviceHeader, DeviceBody
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
