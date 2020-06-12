import request from '@/utils/request'

export function getWarnNum (pid, cid) {
  return request({
    method: 'get',
    url: '/incident/stats?productId=' + pid + '&customerId=' + cid
  })
}

export function getWarnList (pid, cid, status = 1) {
  return request({
    method: 'get',
    url: '/incident?status=' + status + '&product=' + pid + '&customerId=' + cid
  })
}
