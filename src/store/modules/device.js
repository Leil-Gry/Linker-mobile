import Device from '@/api/device'

const state = {
  currentDevice: '',
  deviceStatus: '',
  deviceStats: [],
  deviceList: [],
  deviceInfo: []
}

const mutations = {
  SET_CURRENT_DEVICE: (state, currentDevice) => {
    state.currentDevice = currentDevice
  },
  SET_DEVICE_STATUS: (state, deviceStatus) => {
    state.deviceStatus = deviceStatus
  },
  SET_DEVICE_STATS: (state, deviceStats) => {
    state.deviceStats = deviceStats
  },
  SET_DEVICE_LIST: (state, deviceList) => {
    state.deviceList = deviceList
  },
  SET_DEVICE_INFO: (state, deviceInfo) => {
    state.deviceInfo = deviceInfo
  }
}

const actions = {
  getDeviceStats ({ rootGetters, commit }) {
    return new Promise((resolve, reject) => {
      Device.getDeviceStats(rootGetters.customerRoleId, rootGetters.productId).then(res => {
        commit('SET_DEVICE_STATS', res.device)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getDeviceInfo ({ rootGetters, commit }) {
    return new Promise((resolve, reject) => {
      Device.getDeviceInfo(rootGetters.customerRoleId, rootGetters.deviceId, rootGetters.productId).then(res => {
        commit('SET_DEVICE_INFO', res)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getDeviceList ({ rootGetters, commit }) {
    return new Promise((resolve, reject) => {
      Device.getDeviceList(rootGetters.customerRoleId, rootGetters.productId).then(res => {
        console.log(res)
        commit('SET_DEVICE_LIST', res)
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
