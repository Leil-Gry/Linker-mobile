<template>
  <div>
    <van-tabbar v-model="tabbarActive">
      <van-tabbar-item name='Home' icon="home-o" to="home">首页</van-tabbar-item>
      <van-tabbar-item name='Search' icon="search" @click="goSearch">搜索</van-tabbar-item>
      <van-tabbar-item name='Warn' icon="warn-o" :info="warnNum" to="warn">告警</van-tabbar-item>
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
  computed: {
    ...mapGetters([
      'warnNum',
      'searchResult'
    ]),
    tabbarActive: {
      get () { return this.$store.getters.tabbarActive },
      set (value) { this.$store.commit('flags/SET_TABBAR_ACTIVE', value) }
    }
  },
  mounted () {
    this.getWarnNum()
    setInterval(this.getWarnNum, 30000)
  },
  methods: {
    goSearch () {
      this.$router.push({name: this.searchResult.length > 0 ? 'Search' : 'ToSearch'})
    },
    getWarnNum () {
      this.$store.dispatch('warn/getWarnNum')
    }
  }
}
</script>
