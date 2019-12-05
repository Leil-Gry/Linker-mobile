<template>
  <div class='hello'>
    <device-detail-header></device-detail-header>
    <device-detail-body></device-detail-body>
  </div>
</template>

<script>
import DeviceDetailHeader from './components/detailHeader'
import DeviceDetailBody from './components/detailBody'
export default {
  name: 'DeviceDetail',
  components: {
    DeviceDetailHeader, DeviceDetailBody
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
