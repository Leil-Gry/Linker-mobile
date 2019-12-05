<template>
  <div style="margin-top:60%">
    <router-link to='/warnList' style="color:black">
      <van-row>
        <van-col span="24">
          <span style="font-size:20px">告警总数</span>
        </van-col>
      </van-row>
      <van-row style="margin-top:15px">
        <van-col span="24">
          <span style="font-size: 30px; color: gray">{{warnNum}}</span>
        </van-col>
      </van-row>
    </router-link>
  </div>
</template>

<script>
import { Button, Row, Col, Tag } from 'vant'
export default {
  name: 'WarnBody',
  components: {
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tag.name]: Tag
  },
  data () {
    return {
      warnNum: 0
    }
  },
  mounted () {
    this.getWarnNum()
    setInterval(this.getWarnNum, 30000)
  },
  methods: {
    getWarnNum () {
      this.$http.get('/incident/stats?productId=5c39ee9611b780012c8c30aa&customerId=5c9c9907267cd71fff956329')
        .then((result) => {
          this.warnNum = result.data[0] ? result.data[0].num : 0
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.warnTag{
  font-size: 18px;
  height: 60px;
  line-height: 60px;
  width: 40%
}
</style>
