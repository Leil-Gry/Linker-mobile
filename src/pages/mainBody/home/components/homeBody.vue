<template>
  <div>
    <div class="productName">{{productName}}</div>
    <div style="margin-top:5%">
      <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-exit3"></use>
      </svg>
      <van-row type='flex' align="center" justify="center">
        <van-col span="7" @click="goDevice('sum')">
          <span class="stats-title">设备总数</span>
        </van-col>
        <van-col span="1">
          <div class="v-bar-right"></div>
        </van-col>

        <van-col class='sumCol' span="1">
          <div class="circle-online"></div>
        </van-col>
        <van-col span="6" @click="goDevice('on')">
          <span style="float:left" class="stats-title">当前在线</span>
        </van-col>
        <van-col span="1">
          <div class="v-bar-right"></div>
        </van-col>

        <van-col class='sumCol' span="1">
          <div class="circle-offline"></div>
        </van-col>
        <van-col span="7" @click="goDevice('off')">
          <span style="float:left" class="stats-title">离线设备</span>
        </van-col>
      </van-row>

      <van-row>
        <van-col span="7" @click="goDevice('sum')">
          <span class="stats-num">{{deviceNum}}</span>
        </van-col>
        <van-col span="1">
          <div class="v-bar-right"></div>
        </van-col>
        <van-col span="7" @click="goDevice('on')">
          <span class="stats-num">{{onNum}}</span>
        </van-col>
        <van-col span="1">
          <div class="v-bar-right"></div>
        </van-col>
        <van-col span="7" @click="goDevice('off')">
          <span class="stats-num">{{offNum}}</span>
        </van-col>
        <van-col span="1">
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Button, Row, Col, Icon, Tag } from 'vant'
export default {
  name: 'HomeBody',
  components: {
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tag.name]: Tag,
    [Icon.name]: Icon
  },
  data () {
    return {
      deviceNum: 0,
      onNum: 0,
      offNum: 0,
      productName: ''
    }
  },
  mounted () {
    this.getDeviceNum()
    this.getProductInfo()
  },
  methods: {
    getDeviceNum () {
      this.$http.get('/customer/5c9c9907267cd71fff956329/stats?productId=5c39ee9611b780012c8c30aa')
        .then((result) => {
          result.data.device.forEach(item => {
            if (item.num !== 3) {
              this.deviceNum += item.num
            }
            if (item.status === 1) {
              this.onNum += item.num
            }
            if (item.status === 2) {
              this.offNum += item.num
            }
          })
        }).catch((err) => {
          console.log(err)
        })
    },
    goDevice (status) {
      this.$router.push({path: '/deviceList', query: {status: status}})
    },
    getProductInfo () {
      this.$http.get('/product/5c39ee9611b780012c8c30aa')
        .then((result) => {
          this.productName = result.data.name
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.productName{
  text-align: center;
  font-size: 30px;
  margin-top: 20%;
  height: 50px
}
.tag{
  font-size: 18px;
  height: 60px;
  line-height: 60px;
  width: 70%
}
.circle-online {
  width: 12px;
  height: 12px;
  background-color:#0fc18b;
  border-radius: 6px;
}
.circle-offline {
  width: 12px;
  height: 12px;
  background-color: grey;
  border-radius: 6px;
}
.sumCol{
  text-align: center;
  height: 100%;
  width: 20;
}
.stats-title {
  font-size: 14px;
  color: gray
}
.stats-num {
  font-size: 30px;
}
.v-bar-right {
    width: 30px;
    height: 40px;
    border-left: solid #ebecec 1px;
}
</style>
