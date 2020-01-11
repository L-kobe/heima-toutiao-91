// 特意处理用户信息的存储和删除 以及获取 放置在localStorge
const USER_TOKRN = 'heima-toutiao-m-91-token'
// 设置用户信息
export function setItem (user) {
  localStorage.setItem(USER_TOKRN, JSON.stringify(user))
}
// 获取用户信息
export function getItem () {
  return JSON.parse(localStorage.getItem(USER_TOKRN) || '{}')
}
// 删除用户信息
export function delItem () {
  localStorage.removeItem(USER_TOKRN)
}
