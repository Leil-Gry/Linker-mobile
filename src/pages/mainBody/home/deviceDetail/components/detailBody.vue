<template>
  <div>
    <div class="rolStyle">
      <span class="left">描述</span>
      <span class="right">{{deviceInfo.description}}</span>
    </div>
    <van-divider style="margin: 0"/>
    <div class="rolStyle">
      <span class="left">状态</span>
      <!-- <span class="statusOn" v-if="status">
        <van-icon name="smile-o" style="margin:0"/>
      </span>
      <span class="statusOff" v-else>
        <van-icon name="close"/>
      </span> -->
      <span class="right">
        <van-tag size="medium" :type="getStatusTagType(deviceInfo.status)">{{getStatus(deviceInfo.status)}}</van-tag>
      </span>
      <!-- <span class="right">{{deviceInfo.status}}</span> -->
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
import { List, Cell, Panel, Divider, Icon, Tag } from 'vant'
export default {
  name: 'DetailBody',
  components: {
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
      status: false
    }
  },
  mounted () {
    this.getDevice()
  },
  methods: {
    getDevice () {
      this.$http.get('/product/5c39ee9611b780012c8c30aa/device/' + this.deviceId + '?customerId=5c9c9907267cd71fff956329')
        .then((result) => {
          this.deviceInfo = result.data
          this.tags = result.data.tags
        }).catch((err) => {
          console.log(err)
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
<!-- Add 'scoped' attribute to limit CSS to this component only -->
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
