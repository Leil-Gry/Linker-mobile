<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" @click="goSearch">搜索</van-tabbar-item>
      <van-tabbar-item icon="warn-o" :info="warnNum" to="warn">告警</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Icon } from 'vant'
import { mapGetters } from 'vuex'
export default {
  name: 'Tabbar',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon
  },
  data () {
    return {
      active: 0
    }
  },
  computed: {
    ...mapGetters([
      'warnNum',
      'searchResult'
    ])
  },
  mounted () {
    this.getWarnNum()
    setInterval(this.getWarnNum, 30000)
  },
  methods: {
    goSearch () {
      if (this.searchResult.length > 0) {
        console.log(this.searchResult)
        this.$router.push({name: 'Search'})
      } else this.$router.push({name: 'ToSearch'})
    },
    getWarnNum () {
      this.$store.dispatch('warn/getWarnNum')
    }
  }
}
</script>
