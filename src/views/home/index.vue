<template>
  <div>
    <van-cell
      class="firstCell"
      @click="showPopup = true">
      <van-icon
        class="firstCellIcon"
        slot="right-icon"
        name="wap-nav"
        style="line-height: inherit;"
      />
    </van-cell>
    <van-popup
      v-model="showPopup"
      position="right"
      :style="{ height: '100%',width: '50%' }"
    >
      <van-cell :title="productUniqueName"/>
      <van-cell title="选择产品" @click="goProduct"/>
      <div class="fixBottom">
        <van-cell title="用户设置" class="bottomStyle" @click="goUserSetting"/>
        <van-cell title="注销" class="bottomStyle" @click="logout"/>
      </div>
    </van-popup>

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
  </div>
</template>

<script>
import { Popup, Cell, Icon, Row, Col } from 'vant'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Home',
  components: {
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col
  },
  data () {
    return {
      showPopup: false,
      deviceNum: 0,
      onNum: 0,
      offNum: 0
    }
  },
  computed: {
    ...mapGetters([
      'deviceStats',
      'productName',
      'productUniqueName'
    ])
  },
  mounted () {
    this.getDeviceNum()
  },
  methods: {
    ...mapActions({
      clearLoginInfo: 'user/clearLoginInfo',
      getDeviceStats: 'device/getDeviceStats'
    }),
    goProduct () {
      this.$router.push({name: 'Product'})
    },
    getDeviceNum () {
      this.getDeviceStats().then(() => {
        this.deviceStats.forEach(item => {
          switch (item.status) {
            case 1:
              this.onNum += item.num
              this.deviceNum += item.num
              break
            case 2:
              this.offNum += item.num
              this.deviceNum += item.num
              break
          }
        })
      })
    },
    goDevice (status) {
      let deviceStatus = ''
      deviceStatus = status === 'on' ? 1 : deviceStatus = status === 'off' ? 2 : ''

      this.$store.commit('device/SET_DEVICE_STATUS', deviceStatus)
      this.$router.push({name: 'Device'})
    },
    goUserSetting () {
      this.$router.push({name: 'UserSetting'})
    },
    logout () {
      this.clearLoginInfo()
      this.$router.push({name: 'Login'})
    }
  }
}
</script>

<style scoped>
.firstCell{
  width:20%;
  margin-left:80%;
}

.fixBottom{
  width: 100%;
  position: fixed;
  bottom: 0;
}

.bottomStyle{
  width: 100%;
  height:50px;
}

.firstCell{
  width:20%;
  margin-left:80%;
  text-align: right;
}

.firstCellIcon{
  margin-left: 20px;
  font-size: 30px;
}

.productName{
  text-align: center;
  font-size: 30px;
  margin-top: 20%;
  height: 50px
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

.stats-num {
  font-size: 30px;
}

.v-bar-right {
    width: 30px;
    height: 40px;
    border-left: solid #ebecec 1px;
}
</style>
