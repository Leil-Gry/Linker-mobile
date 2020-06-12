import request from '@/utils/request'

/**
 * 获取标签
 */
export function getTags (pid, size = 20) {
  return request({
    method: 'get',
    url: '/product/' + pid + '/tags?size=' + size
  })
}
/**
 * 获取标签值
 */
export function getTagValues (pid, tag) {
  return request({
    method: 'get',
    url: '/product/' + pid + '/tag/' + tag + '/values?size=20'
  })
}

export function getVariable (pid) {
  return request({
    method: 'get',
    url: '/product/' + pid
  })
}

export function search (pid, cid, query) {
  return request({
    method: 'post',
    url: '/product/' + pid + '/query?customerId=' + cid,
    data: query
  })
}
