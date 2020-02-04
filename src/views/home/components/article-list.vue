<template>
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="refreshSuccessText">
      <van-list v-model="upLoading" @load="onLoad" :finished="finished" finished-text="没有更多了">
        <van-cell v-for="article in articles" :key="article.art_id.toString()">
          <div class="article_item">
            <h3 class="van-ellipsis">{{article.title}}</h3>

            <!-- 三图模式 -->
            <div class="img_box" v-if="article.cover.type === 3">
              <van-image class="w33" fit="cover" src="article.cover.images[0]" />
              <van-image class="w33" fit="cover" src="article.cover.images[1]" />
              <van-image class="w33" fit="cover" src="article.cover.images[2]" />
            </div>
            <!-- 单图模式 -->
            <div class="img_box" v-else-if="article.cover.type === 1">
              <van-image class="w100" fit="cover" :src="article.cover.images[0]"/>
            </div>
            <div class="info_box">
              <span>{{article.aut_name}}</span>
              <span>{{article.comm_count}}</span>
              <span>{{article.pubdate}}</span>
              <span class="close">
                <van-icon name="cross"></van-icon>
              </span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'article-list',
  data () {
    return {
      upLoading: false,
      finished: false,
      articles: [],
      refreshSuccessText: '更新成功', // 文本
      downLoading: false,
      timestamp: null
    }
  },
  props: {
    channel_id: {
      type: Number,
      default: null,
      required: true
    }
  },
  methods: {
    // 上拉加载方法
    async onLoad () {
      // setTimeout(() => {
      //   if (this.articles.length === 50) {
      //     this.finished = true
      //   } else {
      //     let arr = Array.from(
      //       Array(10),
      //       (value, index) => index + this.articles.length + 1
      //     )
      //     this.articles.push(...arr)
      //     this.upLoading = false
      //   }
      // }, 1000)
      const data = await getArticles({
        channel_id: this.channel_id,
        timestamp: this.timestamp || Date.now()
      })
      this.articles.push(...data.results)
      this.upLoading = false
      if (data.pre_timestamp) {
        this.timestamp = data.pre_timestamp
      } else {
        this.finished = true
      }
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
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
