<template>
  <div>
    <van-nav-bar
      title="设备列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
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
import { NavBar, List, Cell, Tag } from 'vant'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'DeviceListBody',
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
      status: '',
      aaa: ''
    }
  },
  computed: {
    ...mapGetters([
      'deviceList'
    ])
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
    ...mapMutations({
      SET_CHOOSED_DEVICE: 'search/SET_CHOOSED_DEVICE'
    }),
    onClickLeft () {
      window.history.go(-1)
    },
    onClickRight () {
    },
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        this.$store.dispatch('device/getDeviceList').then(() => {
          let data = this.deviceList
          if (!this.status) {
            this.list = data
          } else {
            data.forEach(item => {
              if (item.status === this.status) {
                this.list.push(item)
              }
            })
          }
        })
        this.loading = false

        // 数据全部加载完成
        this.finished = true
      }, 500)
    },
    chooseDevice (data) {
      this.SET_CHOOSED_DEVICE({
        name: data.name,
        key: data.deviceKey,
        desc: data.description
      })
      this.$router.push({name: 'ToSearch'})
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
