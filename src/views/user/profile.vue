<template>
   <div class="container">
    <van-nav-bar @click-right="saveUserInfo" left-arrow @click-left="$router.back()" title="编辑资料" right-text="保存" ></van-nav-bar>
    <van-cell-group>
      <!-- 头像 -->
      <van-cell is-link title="头像"  center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          @click="showPhoto=true"
          :src="user.photo"
        />
      </van-cell>
      <!-- 用户昵称 -->
      <van-cell is-link @click="showName=true" title="名称" :value="user.name" />
      <!-- 性别 -->
      <van-cell is-link @click="showGender=true" title="性别" :value='user.gender===0?"男":"女"'/>
      <!-- 生日 -->
      <van-cell is-link @click="showDate" title="生日" :value="user.birthday" />
    </van-cell-group>
      <!-- ----------头像弹层------------->
    <!-- 弹层组件 -->
    <van-popup v-model="showPhoto" style="width:80%">
      <!-- 1.选择本地图片
      2.拍照 -->
      <van-cell @click="openChangeFile" is-link title="本地相册选择图片"></van-cell>
      <van-cell is-link title="拍照"></van-cell>
    </van-popup>

    <!-- ----------昵称弹层------------->
    <van-popup round v-model="showName" :close-on-click-overlay="false" style="width:80%">
      <van-field :error-message="nameMsg" v-model.trim="user.name" type="textarea" rows = "4"></van-field>
      <!-- 关闭按钮组件 -->
      <van-button type="info" size="large" block="" @click="btnName">确定</van-button>
    </van-popup>

    <!-- ----------性别弹层------------->
    <van-action-sheet @select="selectItem" :actions="actions" v-model="showGender" cancel-text="取消"></van-action-sheet>

    <!-- ----------生日弹层------------->
    <van-popup v-model="showBirthDay" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel = "showBirthDay = false"
        @confirm = "confirmDate"
      ></van-datetime-picker>
    </van-popup>
    <input ref="myFile" @change="upload()" type="file" style="display:none">
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getUserProfile, updateImg, saveUserInfo } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'profile',
  data () {
    return {
      showPhoto: false,
      showName: false,
      showGender: false,
      showBirthDay: false,
      user: {
        name: '',
        gender: 0,
        birthday: ''
      },
      actions: [{ name: '男' }, { name: '女' }],
      minDate: new Date(1900, 1, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      nameMsg: ''// 专门来控制显示的错误信息
    }
  },
  methods: {
    ...mapMutations(['updatePhoto']),
    btnName () {
      if (this.user.name.length < 1 || this.user.name.length > 7) {
        this.nameMsg = '你的用户昵称不符合1-7的长度要求'
        return false
      }
      // 如果满足继续执行
      this.nameMsg = ''// 先把提示消息清空
      this.showName = false // 关闭弹层
    },
    selectItem (item) {
      this.user.gender = item.name === '男' ? 0 : 1
      this.showGender = false
    },
    confirmDate (date) {
      this.user.birthday = dayjs(date).format('YYYY-MM-DD')
      this.showBirthDay = false
    },
    showDate () {
      // 将字符串转成日期类型
      this.currentDate = new Date(this.user.birthday)
      this.showBirthDay = true
    },
    // 获取用户资料的方法
    async getUserProfile () {
      let data = await getUserProfile()
      this.updatePhoto({ photo: data.photo })
      // console.log(data)
      // 将数据赋值给user
      this.user = data
    },
    // 点击选择图片触发
    openChangeFile () {
      this.$refs.myFile.click()
    },
    async upload () {
      // console.log('选择了图片')
      let data = new FormData()
      data.append('photo', this.$refs.myFile.files[0])
      let result = await updateImg(data)
      this.user.photo = result.photo
      this.showPhoto = false
      this.updatePhoto({
        photo: result.photo
      })
    },
    // 保存方法
    async saveUserInfo () {
      try {
        await saveUserInfo({ ...this.user, photo: null })
        this.$gnotify({ type: 'success', message: '保存成功' })
      } catch (error) {
        this.$gnotify({ type: 'danger', message: '保存失败' })
      }
    }
  },
  created () {
    this.getUserProfile()
  }
}
</script>

<style lang="less" scoped>
</style>
