import request from '@/utils/request'

export default{
  /**
   * 获取产品
   * @param {*} cid 消费者权限id
   */
  getProduct (cid) {
    return request({
      method: 'get',
      url: '/customer/' + cid + '/product'
    })
  },
  /**
   * 获取产品信息
   * @param {*} pid 产品id
   */
  getProductInfo (pid) {
    return request({
      method: 'get',
      url: '/product/' + pid
    })
  }
}
