const getters = {
  customerRoleId: state => state.user.customerRoleId,
  productId: state => state.product.currentProduct.pid,
  productName: state => state.product.currentProduct.name,
  productUniqueName: state => state.product.currentProduct.name + '@' + state.product.currentProduct.pid.slice(0, 4),
  warnList: state => state.warn.warnList,
  warnNum: state => state.warn.warnNum,
  tags: state => state.search.tags,
  tagValues: state => state.search.tagValues,
  specification: state => state.search.specification,
  searchResult: state => state.search.searchResult,
  currentDevice: state => state.device.currentDevice,
  deviceId: state => state.device.currentDevice.id,
  deviceStats: state => state.device.deviceStats,
  deviceStatus: state => state.device.deviceStatus,
  deviceList: state => state.device.deviceList,
  deviceInfo: state => state.device.deviceInfo,
  choosedDevice: state => state.search.choosedDevice,
  searchMemory: state => state.search.searchMemory
}

export default getters
