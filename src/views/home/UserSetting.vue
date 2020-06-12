<template>
  <div>
    <van-nav-bar
        title="用户设置"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <div class="rolStyle">
      <span class="left">姓名</span>
      <span class="right">{{fullName}}</span>
    </div>
    <van-divider style="margin: 0"/>
    <div class="rolStyle">
      <span class="left">账号</span>
      <span class="right">{{email}}</span>
    </div>
  </div>
</template>

<script>
import { NavBar, Divider } from 'vant'
import { mapGetters } from 'vuex'

export default {
  name: 'UserSetting',
  components: {
    [NavBar.name]: NavBar,
    [Divider.name]: Divider
  },
  computed: mapGetters({
    email: 'email',
    fullName: 'fullName'
  }),
  methods: {
    onClickLeft () {
      this.$router.go(-1)
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
</style>
