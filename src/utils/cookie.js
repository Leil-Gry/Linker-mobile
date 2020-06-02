import Cookies from 'js-cookie'

const TokenKey = 'Authorization'
const Username = 'username'

export default{
  getToken () {
    return Cookies.get(TokenKey)
  },

  setToken (token) {
    return Cookies.set(TokenKey, token)
  },

  removeToken () {
    return Cookies.remove(TokenKey)
  },

  getUsername () {
    return Cookies.get(Username)
  },

  setUsername (name) {
    return Cookies.set(Username, name)
  },

  removeUsername () {
    return Cookies.remove(Username)
  }
}
