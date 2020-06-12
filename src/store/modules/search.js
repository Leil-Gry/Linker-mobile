import { getTags, getTagValues, getVariable, search } from '@/api/search'

const state = {
  tags: [],
  tagValues: [],
  specification: [],
  searchResult: [],
  choosedDevice: '',
  searchMemory: {
    startTime: '',
    endTime: '',
    queries: [],
    tagsArray: []
  }
}

const mutations = {
  SET_TAGS: (state, tags) => {
    state.tags = tags
  },
  SET_TAG_VALUES: (state, tagValues) => {
    state.tagValues = tagValues
  },
  SET_SPECIFICATION: (state, specification) => {
    state.specification = specification
  },
  SET_SEARCH_RESULT: (state, searchResult) => {
    state.searchResult = searchResult
  },
  SET_CHOOSED_DEVICE: (state, choosedDevice) => {
    state.choosedDevice = choosedDevice
  },
  SET_SEARCH_MEMORY: (state, searchMemory) => {
    state.searchMemory = searchMemory
  }
}

const actions = {
  getTags ({ rootGetters, commit }) {
    return new Promise((resolve, reject) => {
      getTags(rootGetters.productId).then(res => {
        commit('SET_TAGS', res)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getTagValues ({ rootGetters, commit }, tag) {
    return new Promise((resolve, reject) => {
      getTagValues(rootGetters.productId, tag).then(res => {
        commit('SET_TAG_VALUES', res)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  getVariable ({ rootGetters, commit }) {
    return new Promise((resolve, reject) => {
      getVariable(rootGetters.productId).then(response => {
        commit('SET_SPECIFICATION', response.specification)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  search ({ rootGetters, commit }, query) {
    return new Promise((resolve, reject) => {
      search(rootGetters.productId, rootGetters.customerRoleId, query).then(response => {
        commit('SET_SEARCH_RESULT', response)
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
