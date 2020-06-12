import request from '@/utils/request'

/**
 * 获取设备
 * @param {*} cid 消费者权限id
 * @param {*} pid 产品id
 */
export function getDeviceStats (cid, pid) {
  return request({
    method: 'get',
    url: '/customer/' + cid + '/stats?productId=' + pid
  })
}
/**
 * 获取设备列表
 * @param {*} cid 消费者权限id
 * @param {*} pid 产品id
 */
export function getDeviceList (cid, pid) {
  return request({
    method: 'get',
    url: '/product/' + pid + '/device?customerId=' + cid
  })
}
/**
 * 获取设备信息
 * @param {*} cid 消费者权限id
 * @param {*} did 设备id
 * @param {*} pid 产品id
 */
export function getDeviceInfo (cid, did, pid) {
  return request({
    method: 'get',
    url: '/product/' + pid + '/device/' + did + '?customerId=' + cid
  })
}
