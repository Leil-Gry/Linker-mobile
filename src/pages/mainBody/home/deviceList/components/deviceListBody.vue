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
        @click="goDetail(item)"
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
  name: 'DeviceListBody',
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [Tag.name]: Tag
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      status: '',
      aaa: ''
    }
  },
  mounted () {
    let url = window.location.hash
    let query = url.split('=')[1]
    if (query === 'on') {
      this.status = 1
    } else if (query === 'off') {
      this.status = 2
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        this.$http.get('/product/5c39ee9611b780012c8c30aa/device?customerId=5c9c9907267cd71fff956329')
          .then((result) => {
            let data = result.data
            if (!this.status) {
              this.list = data
            } else {
              data.forEach(item => {
                if (item.status === this.status) {
                  this.list.push(item)
                }
              })
            }
          }).catch((err) => {
            console.log(err)
          })
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        this.finished = true
      }, 500)
    },
    goDetail (data) {
      sessionStorage.setItem('chooseDeviceInfo', JSON.stringify(data))
      this.$router.replace({path: '/deviceDetail', query: {status: window.location.hash.split('=')[1]}})
    },
    getStatus (status) {
      switch (status) {
        case 1:
          return '在线'
        case 2:
          return '离线'
        case 3:
          return '已激活'
        case 4:
          return '未激活'
      }
    },
    getStatusTagType (status) {
      switch (status) {
        case 1:
          return 'success'
        case 2:
          return 'default'
        case 3:
          return 'primary'
        case 4:
          return 'danger'
      }
    }
  }
}
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
