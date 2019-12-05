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
        :title="item.name"
        :label="item.description"
        @click="chooseDevice(item)"
        type="flex"
        align="left"
        >
        <template slot="default">
          <van-tag :type="getStatusTagType(item.status)">{{getStatus(item.status)}}</van-tag>
        </template>
        </van-cell>
    </van-list>
  </div>
</template>

<script>
import { List, Cell, Tag } from 'vant'
export default {
  name: 'DeviceBody',
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [Tag.name]: Tag
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
        this.$http.get('/product/5c39ee9611b780012c8c30aa/device?customerId=5c9c9907267cd71fff956329')
          .then((result) => {
            this.list = result.data
            console.log(result)
          }).catch((err) => {
            console.log(err)
          })
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        this.finished = true
      }, 500)
    },
    getStatus (status) {
      switch (status) {
        case 1: return '在线'
        case 2: return '离线'
        case 3: return '已激活'
        case 4: return '未激活'
      }
    },
    getStatusTagType (status) {
      switch (status) {
        case 1: return 'success'
        case 2: return 'default'
        case 3: return 'primary'
        case 4: return 'danger'
      }
    },
    chooseDevice (data) {
      localStorage.setItem('device', JSON.stringify({
        name: data.name,
        key: data.deviceKey,
        desc: data.description
      }))
      this.$router.push('/toSearch')
    }
  }
}
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
