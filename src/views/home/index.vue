<template>
  <div>
    <van-cell
      class="firstCell"
      @click="showPopup">
      <van-icon
        class="firstCellIcon"
        slot="right-icon"
        name="wap-nav"
        style="line-height: inherit;"
      />
    </van-cell>
    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%',width: '50%' }"
    >
      <van-cell title="产品名称"/>
      <van-cell title="选择产品"/>
      <div class="fixBottom">
        <van-cell title="用户设置" class="bottomStyle"/>
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
import { Popup, Cell, Tabbar, TabbarItem, Icon, Button, Row, Col, Tag } from 'vant'
import { mapGetters, mapMutations } from 'vuex'
import { removeToken, removeUsername } from '@/utils/user'
export default {
  name: 'Home',
  components: {
    [Popup.name]: Popup,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tag.name]: Tag
  },
  data () {
    return {
      active: 0,
      show: false,
      deviceNum: 0,
      onNum: 0,
      offNum: 0,
      productName: ''
    }
  },
  computed: {
    ...mapGetters([
      'device',
      'product'
    ])
  },
  mounted () {
    this.getDeviceNum()
    this.getProductInfo()
  },
  methods: {
    ...mapMutations({
      SET_TOKEN: 'user/SET_TOKEN'
    }),
    showPopup () {
      this.show = true
    },
    logout () {
      removeToken()
      removeUsername()
      this.SET_TOKEN('')
      this.$router.push({name: 'Login'})
    },
    getDeviceNum () {
      this.$store.dispatch('home/getDevice').then(() => {
        console.log(this.device)
        this.device.forEach(item => {
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
      })
    },
    goDevice (status) {
      this.$router.push({name: 'Device', query: {status: status}})
    },
    getProductInfo () {
      this.$store.dispatch('home/getProduct').then(() => {
        this.productName = this.product
      })
    }
  }
}
</script>

<style scoped>
  .setBorder {
    border: 1px solid gray
  }

  .firstCell{
    width:20%;
    margin-left:80%;
  }

  .downCell{
    position:absolute;
    padding-bottom:10%;
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
