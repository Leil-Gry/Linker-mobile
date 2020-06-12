import request from '@/utils/request'

/**
 * 获取用户信息
 */
export function getUserInfo () {
  return request({
    method: 'get',
    url: '/auth/me'
  })
}
/**
 * 用户登录
 * @param {*} loginForm 登录参数{*email:邮件, *password:密码, captcha:验证码}  *必要
 */
export function login (loginForm) {
  return request({
    method: 'post',
    url: '/auth/signin',
    data: loginForm
  })
}
