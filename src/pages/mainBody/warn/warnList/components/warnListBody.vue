<template>
  <div>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
    <van-cell
        v-for="item in list"
        :key="item.id"
        :title="item.entityId"
        :label="item.createdAt | localTime"
        :value="item.numAlerts"
        type="flex"
        align="left"
        />
    </van-list>
  </div>
</template>

<script>
import { List, Cell } from 'vant'
export default {
  name: 'WarnListBody',
  components: {
    [List.name]: List,
    [Cell.name]: Cell
  },
  mounted () {
    this.getWarnList()
    setInterval(this.getWarnList, 30000)
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        this.list = this.list ? this.list : []
        this.list.forEach(element => {
          element.createdAt = new Date(element.createdAt).toLocaleString('chinese', {hour12: false}).replace(/\//g, '-')
        })

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        this.finished = true
      }, 500)
    },
    chooseDevice (data) {
      localStorage.setItem('device', JSON.stringify({
        name: data.name,
        key: data.deviceKey,
        desc: data.description
      }))
      this.$router.push('/toSearch')
    },
    getWarnList () {
      this.$http.get('/incident?status=1&product=5c39ee9611b780012c8c30aa&customerId=5c9c9907267cd71fff956329')
        .then((result) => {
          this.list = result.data
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
