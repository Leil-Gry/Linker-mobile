<template>
  <div>
    <van-nav-bar
      :title="deviceName"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
import { NavBar } from 'vant'
export default {
  name: 'DetailHeader',
  components: {
    [NavBar.name]: NavBar
  },
  data () {
    return {
      deviceName: ''
    }
  },
  mounted () {
    let info = JSON.parse(sessionStorage.getItem('chooseDeviceInfo'))
    this.deviceName = info.name
  },
  methods: {
    onClickLeft () {
      this.$router.replace({path: '/deviceList', query: {status: window.location.hash.split('=')[1]}})
    },
    onClickRight () {
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
