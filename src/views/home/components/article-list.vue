<template>
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="refreshSuccessText">
      <van-list v-model="upLoading" @load="onLoad" :finished="finished" finished-text="没有更多了">
        <van-cell v-for="article in articles" :key="article" :title="article"></van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'article-list',
  data () {
    return {
      upLoading: false,
      finished: false,
      articles: [],
      refreshSuccessText: '更新成功', // 文本
      downLoading: false
    }
  },
  methods: {
    onLoad () {
      setTimeout(() => {
        if (this.articles.length === 50) {
          this.finished = true
        } else {
          let arr = Array.from(
            Array(10),
            (value, index) => index + this.articles.length + 1
          )
          this.articles.push(...arr)
          this.upLoading = false
        }
      }, 1000)
    },
    onRefresh () {
      // 触发下拉刷新
      setTimeout(() => {
        let arr = Array.from(Array(10), (value, index) => '追加' + (index + 1))
        this.articles.unshift(...arr) // 将数据添加到队首
        this.downLoading = false // 关掉了下拉状态
        this.refreshSuccessText = `更新了${arr.length}条数据`
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
