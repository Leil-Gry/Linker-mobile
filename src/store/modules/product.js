import { getProduct } from '@/api/product'

const state = {
  productList: [], // element{id,name}
  currentProduct: ''
}

const mutations = {
  SET_PRODUCT_LIST: (state, productList) => {
    state.productList = productList
    state.currentProduct = productList[0]
  },
  SET_CURRENT_PRODUCT: (state, currentProduct) => {
    state.currentProduct = currentProduct
  }
}

const actions = {
  async getProduct ({ commit }, customerId) {
    return new Promise((resolve, reject) => {
      getProduct(customerId).then(res => {
        let productList = []
        res.forEach(element => {
          productList.push({
            pid: element.id,
            name: element.name,
            uniqueName: element.name + '@' + element.id.slice(0, 4),
            description: element.description
          })
        })
        commit('SET_PRODUCT_LIST', productList)
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
