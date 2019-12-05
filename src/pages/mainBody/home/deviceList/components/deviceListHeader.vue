<template>
  <div>
    <van-nav-bar
      title="设备列表"
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
  name: 'DeviceListHeader',
  components: {
    [NavBar.name]: NavBar
  },
  methods: {
    onClickLeft () {
      this.$router.push('/home')
    },
    onClickRight () {
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
