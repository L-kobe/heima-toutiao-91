import request from '@/utils/request'
// 获取推荐文章的数据
// axios中 query参数放置在params上
// body参数放置在data上
export function getArticles (params) {
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { with_top: 1, ...params }
  })
}
export function disLikeArticle (data) {
  return request({
    url: '/article/dislikes',
    method: 'post',
    data
  })
}
export function reportArticle (data) {
  return request({
    url: '/article/reports',
    data,
    method: 'post'
  })
}
// 获取文章搜索的建议
export function suggestion (params) {
  return request({
    url: '/suggestion',
    params
  })
}
// 获取文章搜索的结果
// params是get参数
// data是body参数
export function searchArticle (params) {
  return request({
    url: '/search',
    params
  })
}
// 获取文章详情
export function getArticleInfo (articleId) {
  return request({
    url: `/articles/${articleId}`
  })
}
// 获取评论或者获取评论回复
export function getComments (params) {
  return request({
    url: '/comments', // 请求地址
    params
  })
}
// 封装评论或者回复评论的方法
export function commentOrReply (data) {
  return request({
    url: '/comments', // 请求地址
    method: 'post', // 请求类型
    data
  })
}
