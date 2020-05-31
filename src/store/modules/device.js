import { getDeviceList, getDeviceDetail } from '@/api/device'

const state = {
  deviceList: [],
  deviceDetail: []
}

const mutations = {
  SET_DEVICE_LIST: (state, deviceList) => {
    state.deviceList = deviceList
  },
  SET_DEVICE_DETAIL: (state, deviceDetail) => {
    state.deviceDetail = deviceDetail
  }
}

const actions = {
  getDeviceDetail ({ commit }, query) {
    return new Promise((resolve, reject) => {
      getDeviceDetail(query).then(response => {
        console.log(response)
        commit('SET_DEVICE_DETAIL', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getDeviceList ({ commit }) {
    return new Promise((resolve, reject) => {
      getDeviceList().then(response => {
        commit('SET_DEVICE_LIST', response)
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
