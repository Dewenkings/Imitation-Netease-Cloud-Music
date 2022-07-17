<template>
  <div class="Login">
      <el-form :model="loginForm"  ref="form" label-width="80px" label-position="right" size="mini">
        <el-form-item label="手机号码:" size="mini" label-width="100px" required>
          <input v-model="loginForm.phoneNum"  class="loginInput">
        </el-form-item>
        <el-form-item label="密码：" size="mini" label-width="100px" required>
          <input type="password" v-model="loginForm.password" class="loginInput" />
        </el-form-item>
        <div class="loginButton">
          <el-button type="danger" @click="login" size="mini">登录</el-button>
        </div>
        <div class="regEnter" @click="$emit('update:isRegisteredShow',true)">注册</div>
      </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    isRegisteredShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loginForm: {
        phoneNum: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.loginByPhone()
    },
    // 手机登陆请求
    async loginByPhone () {
      const timeStamp = Date.parse(new Date())
      const result = await this.$request('/login/cellphone', {
        phone: this.loginForm.phoneNum,
        password: this.loginForm.password,
        withCredentials: true,
        time: timeStamp
      })
      console.log('登陆接口', result)
      if (result.data.code === 200) {
        // 由于接口原因,请求时还是用的别人登陆的接口
        window.localStorage.setItem('userId', result.data.profile.userId)
        this.$emit('getUserInfo', result.data.profile)

        this.$message.success('登录成功!')
        // 修改vuex中的登录状态，flag参数为true
        this.$store.commit('updataLoginState', true)
      } else if (result.data.code === 400) {
        // 手机号错误
        this.$message.error('手机号错误!')
        return false
      } else if (result.data.code === 502) {
        // 密码错误
        this.$message.error('密码错误!')
        return false
      } else {
        // 登录失败，请稍后重试
        this.$message.error('登录失败，请稍后重试!')
        return false
      }

      // 清空输入框的内容
      this.loginForm.password = ''
      this.loginForm.phoneNum = ''
    }
  }
}

</script>

<style lang="less" scoped>

.regEnter {
  width: 100%;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  margin: 15px auto 0;
}

.regEnter:hover {
  text-decoration: underline;
}

.loginInput {
  height: 25px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #999;
  padding-left: 5px;
  width: 175px;
}

.el-form {
  padding-top: 10px;
}

.loginButton {
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
}
.otherLogin {
  display: flex;
  justify-content: center;
}
.loginButton .el-button {
  width: 200px;
}
</style>
