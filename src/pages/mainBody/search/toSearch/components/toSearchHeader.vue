<template>
  <div>
    <van-nav-bar
      title="设备搜索"
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
  name: 'ToSearchHeader',
  components: {
    [NavBar.name]: NavBar
  },
  data () {
    return {
      queryData: localStorage.getItem('queryData')
    }
  },
  methods: {
    onClickLeft () {
      if (!this.queryData) return
      this.$router.push('/search')
    },
    onClickRight () {
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
