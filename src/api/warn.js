import request from '@/utils/request'

export function getWarnNum () {
  return request({
    method: 'get',
    url: '/incident/stats?productId=5c39ee9611b780012c8c30aa&customerId=5c9c9907267cd71fff956329'
  })
}

export function getWarnList () {
  return request({
    method: 'get',
    url: '/incident?status=1&product=5c39ee9611b780012c8c30aa&customerId=5c9c9907267cd71fff956329'
  })
}
