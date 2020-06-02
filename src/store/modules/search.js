import Search from '@/api/search'

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
      Search.getTags(rootGetters.productId).then(response => {
        commit('SET_TAGS', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getTagValues ({ rootGetters, commit }, query) {
    return new Promise((resolve, reject) => {
      Search.getTagValues(rootGetters.productId, query).then(response => {
        commit('SET_TAG_VALUES', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getVariable ({ rootGetters, commit }) {
    return new Promise((resolve, reject) => {
      Search.getVariable(rootGetters.productId).then(response => {
        commit('SET_SPECIFICATION', response.specification)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  search ({ rootGetters, commit }, query) {
    return new Promise((resolve, reject) => {
      Search.search(rootGetters.productId, rootGetters.customerRoleId, query).then(response => {
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
