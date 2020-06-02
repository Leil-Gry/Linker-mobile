<template>
  <div>
    <van-nav-bar
      title="告警列表"
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
import { NavBar, List, Cell } from 'vant'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'WarnListBody',
  components: {
    [NavBar.name]: NavBar,
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
  computed: {
    ...mapGetters([
      'warnList',
      'choosedDevice'
    ])
  },
  methods: {
    ...mapMutations({
      SET_CHOOSED_DEVICE: 'search/SET_CHOOSED_DEVICE'
    }),
    onClickLeft () {
      this.$router.push({name: 'Warn'})
    },
    onClickRight () {
    },
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
      this.SET_CHOOSED_DEVICE({
        name: data.name,
        key: data.deviceKey,
        desc: data.description
      })
      this.$router.push({name: 'ToSearch'})
    },
    getWarnList () {
      this.$store.dispatch('warn/getWarnList')
    }
  }
}
</script>

<style scoped>
</style>
