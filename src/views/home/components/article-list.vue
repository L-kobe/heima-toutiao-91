<template>
  <div class="scroll-wrapper">
    <van-list v-model="upLoading" @load="onLoad" :finished="finished" finished-text="没有更多了">
      <van-cell v-for="article in articles" :key="article" :title="article"></van-cell>
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
    }
  }
}
</script>

<style lang="less" scoped>
</style>
