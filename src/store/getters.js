import { deepCopy } from '@/utils/deepCopy'

const getters = {
  // device
  currentDevice: state => state.device.currentDevice,
  deviceId: state => state.device.currentDevice.id,
  deviceStats: state => state.device.deviceStats,
  deviceStatus: state => state.device.deviceStatus,
  deviceList: state => state.device.deviceList,
  deviceInfo: state => state.device.deviceInfo,

  // flags
  tabbarActive: state => state.flags.tabbarActive,

  // product
  productList: state => state.product.productList,
  productId: state => state.product.currentProduct.pid,
  productName: state => state.product.currentProduct.name,
  productUniqueName: state => state.product.currentProduct.uniqueName,

  // search
  choosedDevice: state => state.search.choosedDevice,
  tags: state => deepCopy(state.search.tags),
  tagValues: state => deepCopy(state.search.tagValues),
  specification: state => deepCopy(state.search.specification),
  searchResult: state => deepCopy(state.search.searchResult),
  searchMemory: state => deepCopy(state.search.searchMemory),

  // user
  customerRoleId: state => state.user.customerRoleId,
  email: state => state.user.email,
  fullName: state => state.user.fullName,

  // warn
  warnList: state => state.warn.warnList,
  warnNum: state => state.warn.warnNum
}

export default getters
