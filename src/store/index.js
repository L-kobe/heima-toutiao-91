import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  // 放置数据的地方  初始化的时候直接将用户信息给我们的公共状态
  state: {
    user: auth.getUser() // 从缓存中获取数据
  },
  mutations: {
    updateUser (state, plyload) {
      state.user = plyload.user // 更新数据
      auth.setUser(plyload.user) // 将数据同步设置到本地储存中
    },
    clearUser (state) {
      state.user = {}
      auth.delUser()// 将缓存中的数据也清空
    }
  },
  actions: {
  },
  modules: {
  }
})
