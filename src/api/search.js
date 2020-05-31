import request from '@/utils/request'

export function getTags () {
  return request({
    method: 'get',
    url: '/product/5c39ee9611b780012c8c30aa/tags?size=20'
  })
}

export function getTagValues (data) {
  return request({
    method: 'get',
    url: '/product/5c39ee9611b780012c8c30aa/tag/' + data + '/values?size=20'
  })
}

export function getVariable () {
  return request({
    method: 'get',
    url: '/product/5c39ee9611b780012c8c30aa'
  })
}

export function search (data) {
  return request({
    method: 'post',
    url: '/product/5c39ee9611b780012c8c30aa/query?customerId=5c9c9907267cd71fff956329',
    data: data
  })
}
