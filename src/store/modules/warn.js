import { getWarnNum, getWarnList } from '@/api/warn'

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
  getWarnNum ({ commit }) {
    return new Promise((resolve, reject) => {
      getWarnNum().then(response => {
        commit('SET_WARN_NUM', response.total)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getWarnList ({ commit }) {
    return new Promise((resolve, reject) => {
      getWarnList().then(response => {
        commit('SET_WARN_LIST', response) // TODO
        resolve()
      }).catch(error => {
        reject(error)
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
