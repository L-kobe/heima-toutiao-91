// 用户相关的请求模块
import request from '@/utils/request'
export function login (data) {
  return request({
    url: '/authorizations',
    data,
    method: 'post'
  })
}
/** *关注用户***/
export function followUser (data) {
  return request({
    url: '/user/followings',
    method: 'post',
    data
  })
}
/** *取消关注***/
export function unFollowUser (target) {
  return request({
    method: 'delete',
    url: `/user/followings/${target}`
  })
}
// 获取用户个人信息
export function getUserInfo () {
  return request({
    url: '/user'
  })
}
// 获取用户个人资料
export function getUserProfile () {
  return request({
    url: '/user/profile' // 获取用户个人资料的接口地址
  })
}
