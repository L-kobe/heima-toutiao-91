import Vue from 'vue'
import VueRouter from 'vue-router'
const Layout = () => import('@/views/layout') // 布局组件
const Home = () => import('@/views/home') // 主页组件
const Question = () => import('@/views/question') // 问答组件
const Video = () => import('@/views/video') // 视频组件
const User = () => import('@/views/user') // 个人中心
const Profile = () => import('@/views/user/profile') // 编辑资料
const Chat = () => import('@/views/user/chat') // 小智同学
const Login = () => import('@/views/login') // 登录组件
const Article = () => import('@/views/article') // 文章详情
const Search = () => import('@/views/search') // 搜索中心
const SearchResult = () => import('@/views/search/result') // 搜索结果

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout, // 一级路由 布局组件layout
    children: [ // 二级路由
      { path: '/', component: Home }, // 二级路由  首页组件
      { path: '/question', component: Question }, // 二级路由   问答组件
      { path: '/video', component: Video }, // 二级路由
      { path: '/user', component: User } // 二级路由
    ]
  },
  { path: '/user/profile', component: Profile }, // 一级路由
  { path: '/user/chat', component: Chat }, // 一级路由
  { path: '/login', component: Login }, // 一级路由
  { path: '/article', component: Article }, // 一级路由
  { path: '/search', component: Search }, // 一级路由
  { path: '/search/result', component: SearchResult } // 一级路由
]

const router = new VueRouter({
  routes
})

export default router
