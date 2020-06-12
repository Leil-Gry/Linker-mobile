import request from '@/utils/request'

/**
 * 获取产品
 * @param {*} cid 消费者权限id
 */
export function getProduct (cid) {
  return request({
    method: 'get',
    url: '/customer/' + cid + '/product'
  })
}
/**
 * 获取产品信息
 * @param {*} pid 产品id
 */
export function getProductInfo (pid) {
  return request({
    method: 'get',
    url: '/product/' + pid
  })
}
