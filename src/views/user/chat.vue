<template>
    <div class="container">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>
    <div class="chat-list" ref="myList">
      <div :class="{left:item.name==='xz',right:item.name!='xz'}" class="chat-item" v-for="(item,index) in list" :key="index">
        <!-- 小智同学的图片 -->
        <van-image v-if="item.name==='xz'" fit="cover" round :src="XZImg" />
        <div class="chat-pao">{{item.msg}}</div>
        <!-- 右边再放置一个图片 -->
        <van-image v-if="item.name!=='xz'"  fit="cover" round :src="photo" />
      </div>
      <!-- <div class="chat-item right">
        <div class="chat-pao">ewqewq</div>

      </div> -->
    </div>
    <div class="reply-container van-hairline--top">
      <van-field v-model.trim="value" placeholder="说点什么...">
        <van-loading v-if="loading" slot="button" type="spinner" size="16px"></van-loading>
        <span v-else @click="send()" slot="button" style="font-size:12px;color:#999">go</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import XZImg from '@/assets/images/xz.png'
import { mapState } from 'vuex'
import io from 'socket.io-client'
export default {
  data () {
    return {
      value: '', // 用来绑定用户的谈话内容
      loading: false,
      XZImg,
      list: []
    }
  },
  methods: {
    scrollBottom () {
      this.$nextTick(() => {
        this.$refs.myList.scrollTop = this.$refs.myList.scrollHeight
      })
    },
    async send () {
      if (!this.value) return false
      this.loading = true
      await this.$sleep()
      let obj = {
        // name: 'self',
        msg: this.value,
        timestamp: Date.now() }
      this.socket.emit('message', obj)
      this.list.push(obj)
      this.value = ''
      // console.log('1')
      this.loading = false
      this.scrollBottom()
    }
  },
  computed: {
    ...mapState(['photo', 'user'])
  },
  created () {
    // 建立和websocket和服务器的连接
    this.socket = io('http://ttapi.research.itcast.cn', {
      query: {
        token: this.user.token
      }
    })
    this.socket.on('connect', () => {
      console.log('和服务器建立连接')
      this.list.push({ msg: '你好', name: 'xz' })
    })
    this.socket.on('message', (data) => {
      this.list.push({ ...data, name: 'xz' })
      this.scrollBottom()
    })
  },
  // 页面销毁之前的钩子函数
  beforeDestroy () {
    this.socket.close()
  }
}
</script>

<style lang="less" scoped>

.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background:#fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item{
      padding: 10px;
      .van-image{
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao{
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before{
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top:0.5px solid #c2d9ea;
          border-right:0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right{
  text-align: right;
  .chat-pao{
    margin-left: 0;
    margin-right: 15px;
    &::before{
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left{
  text-align: left;
  .chat-pao{
    margin-left: 15px;
    margin-right: 0;
    &::before{
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
