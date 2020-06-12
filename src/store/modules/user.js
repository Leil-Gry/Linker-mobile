import { login, getUserInfo } from '@/api/user'
import Cookie from '@/utils/cookie'

const state = {
  customerRoleId: '',
  organizationId: '',
  fullName: '',
  token: '',
  email: ''
}

// 修改state中的值
const mutations = {
  SET_USER_INFO: (state, {customerRoleId, fullName}) => {
    state.customerRoleId = customerRoleId
    state.fullName = fullName
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  REMOVE_ALL: (state) => {
    Object.keys(state).forEach(key => {
      state['key'] = ''
    })
  }
}

// 提交mutations的函数
const actions = {
  async login ({ commit }, loginForm) {
    return new Promise((resolve, reject) => {
      login(loginForm).then(res => {
        commit('SET_TOKEN', 'Bearer '.concat(res.token))
        commit('SET_EMAIL', loginForm.email)
        Cookie.setUsername(loginForm.email)
        Cookie.setToken('Bearer '.concat(res.token))
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  async getUserInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(res => {
        commit('SET_USER_INFO', {
          customerRoleId: res.roles[0].identity,
          fullName: res.fullName
        })
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  async loginAndSaveInfo ({ state, dispatch }, loginForm) {
    await dispatch('login', loginForm)
    await dispatch('getUserInfo')
    dispatch('product/getProduct', state.customerRoleId, {root: true})
  },
  clearLoginInfo ({ commit }) {
    commit('REMOVE_ALL')
    Cookie.removeToken()
    Cookie.removeUsername()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
