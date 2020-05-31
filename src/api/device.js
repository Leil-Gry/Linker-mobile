import request from '@/utils/request'

export function getDeviceList () {
  return request({
    method: 'get',
    url: '/product/5c39ee9611b780012c8c30aa/device?customerId=5c9c9907267cd71fff956329'
  })
}

export function getDeviceDetail (deviceId) {
  return request({
    method: 'get',
    url: '/product/5c39ee9611b780012c8c30aa/device/' + deviceId + '?customerId=5c9c9907267cd71fff956329'
  })
}
