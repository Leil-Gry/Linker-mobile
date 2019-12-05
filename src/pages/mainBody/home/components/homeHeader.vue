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
  </div>
</template>

<script>
import { Popup, Cell, Tabbar, TabbarItem, Icon } from 'vant'
export default {
  name: 'HomeHeader',
  components: {
    [Popup.name]: Popup,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Cell.name]: Cell,
    [Icon.name]: Icon
  },
  data () {
    return {
      active: 0,
      show: false
    }
  },
  methods: {
    showPopup () {
      this.show = true
    },
    logout () {
      localStorage.removeItem('Authorization')
      localStorage.removeItem('searchMemory')
      localStorage.removeItem('specification')
      localStorage.removeItem('queryData')
      localStorage.removeItem('device')
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
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

</style>
