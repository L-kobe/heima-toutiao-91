<template>
  <div class="container">
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 手机号 验证码 登录按钮 -->
    <van-cell-group>
      <van-field
      :error-message="errMsg.mobile"
      @blur="checkMobile"
      v-model.trim="loginForm.mobile" label="手机号" placeholder="请输入手机号" />
      <!-- 验证码 -->
      <van-field
      :error-message="errMsg.code"
      @blur="checkCode"
      v-model.trim="loginForm.code" label="验证码" placeholder="请输入验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn_box">
      <van-button type="info" @click="login" size="small" block round>登 录</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      errMsg: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    checkMobile () {
      if (!this.loginForm.mobile) {
        this.errMsg.mobile = '手机号不能为空'
        return false
      }
      // 判断格式
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errMsg.mobile = '手机格式不正确'
        return false
      }
      this.errMsg.mobile = ''
      return true
    },
    checkCode () {
      if (!this.loginForm.code) {
        this.errMsg.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errMsg.code = '验证码格式不正确'
        return false
      }
      this.errMsg.code = ''
      return true
    },
    login () {
      if (this.checkMobile() && this.checkCode()) {
        console.log('校验成功')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  padding: 20px;
}
</style>
