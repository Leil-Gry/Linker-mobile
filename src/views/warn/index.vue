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
import { mapGetters } from 'vuex'
export default {
  name: 'Warn',
  components: {
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tag.name]: Tag
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'warnNum'
    ])
  },
  mounted () {
    this.getWarnNum()
    setInterval(this.getWarnNum, 30000)
  },
  methods: {
    getWarnNum () {
      this.$store.dispatch('warn/getWarnNum')
    }
  }
}
</script>

<style scoped>
.warnTag{
  font-size: 18px;
  height: 60px;
  line-height: 60px;
  width: 40%
}
</style>
