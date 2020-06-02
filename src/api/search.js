import request from '@/utils/request'

export default{
  /**
   * 获取标签
   */
  getTags (pid, size = 20) {
    return request({
      method: 'get',
      url: '/product/' + pid + '/tags?size=' + size
    })
  },
  /**
   * 获取标签值
   */
  getTagValues (pid, tag) {
    return request({
      method: 'get',
      url: '/product/' + pid + '/tag/' + tag + '/values?size=20'
    })
  },

  getVariable (pid) {
    return request({
      method: 'get',
      url: '/product/' + pid
    })
  },

  search (pid, cid, query) {
    return request({
      method: 'post',
      url: '/product/' + pid + '/query?customerId=' + cid,
      data: query
    })
  }
}
