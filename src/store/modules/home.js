import { getDevice, getProduct } from '@/api/home'

const state = {
  device: [],
  product: []
}

const mutations = {
  SET_DEVICE: (state, device) => {
    state.device = device
  },
  SET_PRODUCT: (state, data) => {
    state.product = data
  }
}

const actions = {
  getDevice ({ commit }) {
    return new Promise((resolve, reject) => {
      getDevice().then(response => {
        commit('SET_DEVICE', response.device)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getProduct ({ commit }) {
    return new Promise((resolve, reject) => {
      getProduct().then(response => {
        commit('SET_PRODUCT', response.name)
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
