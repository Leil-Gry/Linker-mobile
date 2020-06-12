const state = {
  tabbarActive: 'Home'
}

const mutations = {
  SET_TABBAR_ACTIVE: (state, tabbarActive) => {
    state.tabbarActive = tabbarActive
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
