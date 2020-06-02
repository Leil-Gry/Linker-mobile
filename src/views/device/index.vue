<template>
  <div>
    <van-nav-bar
      title="设备列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
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
import { NavBar, List, Cell, Tag } from 'vant'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Device',
  components: {
    [NavBar.name]: NavBar,
    [List.name]: List,
    [Cell.name]: Cell,
    [Tag.name]: Tag
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      status: ''
    }
  },
  computed: {
    ...mapGetters([
      'deviceStatus',
      'deviceList'
    ])
  },
  methods: {
    ...mapActions({
      getDeviceList: 'device/getDeviceList'
    }),
    onClickLeft () {
      this.$router.go(-1)
    },
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        this.getDeviceList().then(() => {
          console.log(this.deviceList)
          let data = this.deviceList
          if (!this.deviceStatus) {
            this.list = data
          } else {
            data.forEach(item => {
              if (item.status === this.deviceStatus) {
                this.list.push(item)
              }
            })
          }
        })
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        this.finished = true
      }, 500)
    },
    goDetail (device) {
      this.$store.commit('device/SET_CURRENT_DEVICE', device)
      this.$router.push({name: 'DeviceInfo'})
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

<style scoped>
</style>
