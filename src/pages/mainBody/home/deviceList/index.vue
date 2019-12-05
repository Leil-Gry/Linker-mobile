<template>
  <div class='hello'>
    <device-list-header></device-list-header>
    <device-list-body></device-list-body>
  </div>
</template>

<script>
import DeviceListHeader from './components/deviceListHeader'
import DeviceListBody from './components/deviceListBody'
export default {
  name: 'DeviceList',
  components: {
    DeviceListHeader, DeviceListBody
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
