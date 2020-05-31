import request from '@/utils/request'

export function getProduct () {
  return request({
    method: 'get',
    url: '/product/5c39ee9611b780012c8c30aa'
  })
}

export function getDevice () {
  return request({
    method: 'get',
    url: '/customer/5c9c9907267cd71fff956329/stats?productId=5c39ee9611b780012c8c30aa'
  })
}
