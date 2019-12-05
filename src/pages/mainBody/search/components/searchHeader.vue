<template>
  <div>
    <van-cell title="">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <van-icon
          slot="right-icon"
          name="search"
          style="line-height: inherit;padding-right:5px"
          size = 25px
          title="点击搜索"
          @click="goSearchDevice"/>
    </van-cell>
  </div>
</template>

<script>
import { Cell, Icon } from 'vant'
export default {
  name: 'SearchHeader',
  components: {
    [Cell.name]: Cell,
    [Icon.name]: Icon
  },
  methods: {
    goSearchDevice () {
      this.$router.push('/toSearch')
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
    .setBorder {
        border: 1px solid gray
    }
</style>
