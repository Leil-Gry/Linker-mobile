<template>
  <div class="hello">
    <van-tabbar v-model="active">
      <!-- <router-link to="/home"> -->
      <van-tabbar-item icon="home-o" @click="goHome">首页</van-tabbar-item>
      <!-- </router-link> -->
      <van-tabbar-item icon="search" @click="goSearch">搜索</van-tabbar-item>
      <van-tabbar-item icon="warn-o" :info="warnNum" @click="goWarn">告警</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Icon } from 'vant'
export default {
  name: 'Bottom',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon
  },
  data () {
    return {
      active: '',
      warnNum: ''
    }
  },
  mounted () {
    this.getWarnNum()
  },
  methods: {
    goHome () {
      this.$router.push('/home')
    },
    goSearch () {
      if (localStorage.getItem('queryData')) {
        this.$router.push('/search')
      } else this.$router.push('/tosearch')
    },
    goWarn () {
      this.$router.push('/warn')
    },
    getWarnNum () {
      this.$http
        .get(
          '/incident/stats?productId=5c39ee9611b780012c8c30aa&customerId=5c9c9907267cd71fff956329'
        )
        .then(result => {
          this.warnNum = result.data[0] ? result.data[0].num : 0
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
