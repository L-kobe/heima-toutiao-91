<template>
  <div class="scroll-wrapper">
    <van-list v-model="upLoading" @load="onLoad" :finished="finished" finished-text="没有更多了">
        <van-cell v-for="article in articles" :key="article">{{article}}</van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'article-list',
  data () {
    return {
      upLoading: false,
      finished: false,
      articles: []
    }
  },
  methods: {
    onLoad () {
      if (this.articles.length < 50) {
        setTimeout(() => {
          this.articles = [...this.articles, ...Array.from(Array(10), (value, index) =>
            index + 1 + this.articles.length)]
          this.upLoading = false
        }, 2000)
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
