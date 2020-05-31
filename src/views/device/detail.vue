<template>
  <div>
    <van-nav-bar
      :title="deviceName"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="rolStyle">
      <span class="left">描述</span>
      <span class="right">{{deviceInfo.description}}</span>
    </div>
    <van-divider style="margin: 0"/>
    <div class="rolStyle">
      <span class="left">状态</span>
      <span class="right">
        <van-tag size="medium" :type="getStatusTagType(deviceInfo.status)">{{getStatus(deviceInfo.status)}}</van-tag>
      </span>
    </div>
    <van-divider style="margin: 0"/>
    <div class="rolStyle">
      <span class="left">deviceKey</span>
      <span class="right">{{deviceInfo.deviceKey}}</span>
    </div>
    <van-divider style="margin: 0"/>
    <div class="rolStyle">
      <span class="left">激活时间</span>
      <span class="right">{{deviceInfo.activatedAt | localTime}}</span>
    </div>
    <van-divider style="margin: 0"/>
    <div class="rolStyle">
      <span class="left">采样周期</span>
      <span class="right">{{deviceInfo.period}}</span>
    </div>
    <van-divider style="margin: 0"/>
    <div class="rolStyle">
      <span class="left">标签</span>
      <span class="tags">
        <van-tag mark type="primary" size="large" v-for="data in tags" :key=data class="tag">{{data}}</van-tag>
      </span>
    </div>
  </div>
</template>

<script>
import { NavBar, List, Cell, Panel, Divider, Icon, Tag } from 'vant'
import { mapGetters } from 'vuex'
export default {
  name: 'DetailBody',
  components: {
    [NavBar.name]: NavBar,
    [List.name]: List,
    [Cell.name]: Cell,
    [Panel.name]: Panel,
    [Divider.name]: Divider,
    [Tag.name]: Tag,
    [Icon.name]: Icon
  },
  data () {
    return {
      deviceId: JSON.parse(sessionStorage.getItem('chooseDeviceInfo')).id,
      deviceInfo: '',
      tags: [],
      status: false,
      deviceName: ''
    }
  },
  computed: {
    ...mapGetters([
      'deviceDetail'
    ])
  },
  mounted () {
    this.getDevice()
    let info = JSON.parse(sessionStorage.getItem('chooseDeviceInfo'))
    this.deviceName = info.name
  },
  methods: {
    onClickLeft () {
      this.$router.replace({path: '/device', query: {status: window.location.hash.split('=')[1]}})
    },
    onClickRight () {
    },
    getDevice () {
      this.$store.dispatch('device/getDeviceDetail', this.deviceId).then(() => {
        this.deviceInfo = this.deviceDetail
        this.tags = this.deviceDetail.tags
      })
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
    }
  }
}
</script>

<style scoped>
.rolStyle{
  height: 60px;
  width: 100%;
}
.left{
  float: left;
  line-height: 60px;
  font-size: 17px;
  margin-left: 10px;
  color: grey
}
.right{
  float: right;
  line-height: 60px;
  font-size: 17px;
  margin-right: 5px;
  color: grey
}
.tags{
  float: right;
  line-height: 60px;
  margin-right: 5px;
}
.tag{
  margin-right: 5px;
}
.statusOn{
  float: right;
  line-height: 60px;
  font-size: 30px;
  margin-right: 15px;
  color: green;
}
.statusOff{
  float: right;
  line-height: 60px;
  font-size: 30px;
  margin-right: 15px;
  color: red;
}
</style>
