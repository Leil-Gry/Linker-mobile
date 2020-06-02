<template>
  <div class="hello">
    <p class="titleStyle">登录</p>
    <van-cell-group style="margin-top: 30px">
        <van-field
            v-model="loginForm.email"
            clearable
            label="用户名"
            placeholder="请输入用户名"
            left-icon="contact"
        />
        <van-field
            ref='pwd'
            v-model="loginForm.password"
            clearable
            :type="pwdInputType"
            label="密码"
            placeholder="请输入密码"
            @click-left-icon="changeEye"
            :left-icon=closeEye
        />
        <van-field
            ref = 'captcha'
            v-if="loginStatus === 400"
            v-model="loginForm.captcha"
            clearable
            label="验证码"
            placeholder="请输入验证码"
            left-icon="warning"
        />
        <div v-if="loginStatus === 400">
          <img :src="captchaImg" />
        </div>
        <div><van-button type="primary" class="loginBtn" round @click="login()">登录</van-button></div>
    </van-cell-group>
  </div>
</template>
<script>
import { Field, Button, CellGroup, Notify } from 'vant'
export default {
  name: 'Login',
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Notify.name]: Notify
  },
  data () {
    return {
      loginForm: {
        email: 'customeradmin@dev.com',
        password: '123456',
        captcha: ''
      },
      pwdInputType: 'password',
      loginStatus: '',
      captcha: '',
      captchaImg: '',
      closeEye: 'closed-eye'
    }
  },
  methods: {
    login () {
      this.$store.dispatch('user/loginAndSaveInfo', this.loginForm)
        .then(res => {
          this.$router.push({name: 'Linker'})
        })
        .catch(err => {
          this.captcha = ''
          if (err.response.status === 401) {
            this.captchaImg = 'data:image/png;base64,' + err.response.data
            Notify({type: 'warning', message: '密码错误！'})
          } else if (err.response.status === 400) {
            this.loginStatus = err.response.status
            this.captchaImg = 'data:image/png;base64,' + err.response.data
          }
        })
    },
    changeEye () {
      if (this.closeEye === 'closed-eye') {
        this.closeEye = 'eye-o'
        this.$nextTick(() => {
          this.pwdInputType = ''
        })
      } else {
        this.pwdInputType = 'password'
        this.closeEye = 'closed-eye'
      }
    }
  }
}
</script>

<style scoped>
.titleStyle {
    margin-top:25%;
    font-family:Arial, Helvetica, sans-serif;
    font-size: 20px;
}

.loginBtn {
    margin-top:30px;
    width: 150px;
}
</style>
