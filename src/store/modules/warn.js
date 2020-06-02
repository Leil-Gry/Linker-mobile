import Warn from '@/api/warn'

const state = {
  warnNum: null,
  warnList: []
}

const mutations = {
  SET_WARN_NUM: (state, warnNum) => {
    state.warnNum = warnNum
  },
  SET_WARN_LIST: (state, warnList) => {
    state.warnList = warnList
  }
}

const actions = {
  getWarnNum ({ rootGetters, commit }) {
    return new Promise((resolve, reject) => {
      Warn.getWarnNum(rootGetters.productId, rootGetters.customerRoleId).then(res => {
        console.log(res)
        commit('SET_WARN_NUM', res.total)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getWarnList ({ rootGetters, commit }) {
    return new Promise((resolve, reject) => {
      Warn.getWarnList(rootGetters.productId, rootGetters.customerRoleId).then(res => {
        commit('SET_WARN_LIST', res) // TODO
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
