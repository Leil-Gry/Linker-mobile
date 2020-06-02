import request from '@/utils/request'

export default{
  getWarnNum (pid, cid) {
    return request({
      method: 'get',
      url: '/incident/stats?productId=' + pid + '&customerId=' + cid
    })
  },

  getWarnList (pid, cid, status = 1) {
    return request({
      method: 'get',
      url: '/incident?status=' + status + '&product=' + pid + '&customerId=' + cid
    })
  }
}
