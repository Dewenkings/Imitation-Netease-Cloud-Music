<template>
  <div class="Login">
    <el-form :model="loginForm" ref="form" label-width="80px" label-position="right" size="mini">
      <el-form-item label="手机号码:" size="mini" label-width="100px" required>
        <input v-model="loginForm.phoneNum" class="loginInput">
      </el-form-item>
      <el-form-item label="密码：" size="mini" label-width="100px" required>
        <input type="password" v-model="loginForm.password" class="loginInput" />
      </el-form-item>
      <div class="loginButton">
        <el-button type="danger" @click="login" size="mini">登录</el-button>
      </div>
      <div class="regEnter" @click="$emit('update:isRegisteredShow', true)">注册</div>
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
    async login () {
      try {
        const timeStamp = Date.parse(new Date())
        const result = await this.$request('/login/cellphone', {
          phone: this.loginForm.phoneNum,
          password: this.loginForm.password,
          withCredentials: true,
          time: timeStamp
        })
        console.log('登陆接口', result)
        // 登录成功
        window.localStorage.setItem('userId', result.data.profile.userId)
        this.$emit('getUserInfo', result.data.profile)
        this.$message.success('登录成功!')
        this.$store.commit('updataLoginState', true)
        // 清空输入框的内容
        this.loginForm.password = ''
        this.loginForm.phoneNum = ''
      } catch (error) {
        console.log('登录错误:', error)
        // 处理不同类型的错误
        if (error.response && error.response.data) {
          const errorData = error.response.data
          switch (errorData.code) {
            case 400:
              this.$message.error('手机号错误!')
              break
            case 502:
              this.$message.error('密码错误!')
              break
            case 8810:
              this.$message.error('网络环境存在安全风险，请稍后重试!')
              break
            default:
              this.$message.error(errorData.msg || errorData.message || '登录失败，请稍后重试!')
          }
        } else {
          this.$message.error('登录失败，请稍后重试!')
        }
        return false
      }
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
