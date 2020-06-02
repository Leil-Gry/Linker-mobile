import request from '@/utils/request'

export default{
  /**
   * 获取用户信息
   */
  getUserInfo () {
    return request({
      method: 'get',
      url: '/auth/me'
    })
  },
  /**
   * 用户登录
   * @param {*} loginForm 登录参数{*emali:邮件, *password:密码, captcha:验证码}  *必要
   */
  login (loginForm) {
    return request({
      method: 'post',
      url: '/auth/signin',
      data: loginForm
    })
  }
}
