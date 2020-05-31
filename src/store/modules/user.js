import { login } from '@/api/login'
import { setToken, removeToken, setUsername, removeUsername } from '@/utils/user'

const state = {
  token: '',
  email: ''
}

// 修改state中的值
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, email) => {
    state.email = email
  }
}

// 提交mutations的函数
const actions = {
  login ({ commit }, loginForm) {
    return new Promise((resolve, reject) => {
      login(loginForm).then(response => {
        commit('SET_TOKEN', 'Bearer '.concat(response.token))
        commit('SET_USERNAME', loginForm.email)
        setUsername(loginForm.email)
        setToken('Bearer '.concat(response.token))
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_USERNAME', '')
      removeToken()
      removeUsername()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
