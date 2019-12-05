export function localTime (datetime) {
  if (!datetime) return ''
  return new Date(datetime).toLocaleString('zh-CN', {hour12: false}).replace(/\//g, '-')
}
export function UTCTime (datetime) {
  if (!datetime) return ''
  return new Date(datetime).toLocaleString('zh-CN', {hour12: false}).replace(/\//g, '-')
}
