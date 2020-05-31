const getters = {
  device: state => state.home.device,
  product: state => state.home.product,
  warnList: state => state.warn.warnList,
  warnNum: state => state.warn.warnNum,
  tags: state => state.search.tags,
  tagValues: state => state.search.tagValues,
  specification: state => state.search.specification,
  searchResult: state => state.search.searchResult,
  deviceList: state => state.device.deviceList,
  deviceDetail: state => state.device.deviceDetail,
  choosedDevice: state => state.search.choosedDevice,
  searchMemory: state => state.search.searchMemory
}

export default getters
