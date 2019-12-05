<template>
  <div class="hello">
    <p class="titleStyle">登录</p>
    <van-cell-group style="margin-top: 30px">
        <van-field
            v-model="email"
            clearable
            label="用户名"
            placeholder="请输入用户名"
            left-icon="contact"
        />
        <van-field
            ref='pwd'
            v-model="password"
            clearable
            type="password"
            label="密码"
            placeholder="请输入密码"
            @click-left-icon="changeEye"
            :left-icon=closeEye
        />
        <van-field
            ref = 'captcha'
            v-if="loginStatus === 400"
            v-model="captcha"
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
  data () {
    return {
      email: 'customeradmin@dev.com',
      password: '123456',
      loginStatus: '',
      captcha: '',
      captchaImg: '',
      closeEye: 'closed-eye'
    }
  },
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Notify.name]: Notify
  },
  methods: {
    login () {
      this.$http.post('/auth/signin', {
        email: this.email,
        password: this.password,
        captcha: this.captcha
      }).then((result) => {
        console.log(result.data.token)
        localStorage.setItem('Authorization', 'Bearer '.concat(result.data.token))
        this.$router.push('/dashboard')
      }).catch((err) => {
        console.log('err')
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
        console.log(this.$refs)
        this.$refs.pwd.type = ''
      } else {
        this.closeEye = 'closed-eye'
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
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
