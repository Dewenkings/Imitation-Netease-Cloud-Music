import axios from 'axios'
import vuex from '../store/index'

// 页面优化进度条--导入NProgress包对应的JS和CSS
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 该项目所有请求均为 get请求
export function request (url, params) {
  // 请求超过30秒则判定为超时
  const instance = axios.create({
    baseURL: 'http://localhost:3001/api', // 你的自定义后端
    timeout: 30000
    // withCredentials: true
  })
  // axios拦截器
  // 请求拦截
  instance.interceptors.request.use(
    (config) => {
      // 后续删除打印的
      console.log('请求拦截器')
      nProgress.start()
      return config
    },
    (err) => {
      console.log(err)
    }
  )
  // 添加响应拦截器
  instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    nProgress.done()

    // 检查网易云API的业务错误码
    const data = response.data
    if (data && data.code && data.code !== 200) {
      // 处理业务错误
      console.log('业务错误:', data)

      // 特殊错误码处理
      switch (data.code) {
        case 400:
          console.error('参数错误:', data.msg || data.message)
          break
        case 502:
          console.error('账号或密码错误:', data.msg || data.message)
          break
        case 8810:
          console.error('网络环境存在安全风险，请稍后重试:', data.message)
          break
        default:
          console.error('API错误:', data.msg || data.message || '未知错误')
      }

      // 抛出错误，让调用方处理
      const error = new Error(data.msg || data.message || 'API错误')
      error.response = {
        data: data,
        status: data.code
      }
      return Promise.reject(error)
    }

    return response
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    nProgress.done()
    console.log('HTTP错误:', error)

    if (error.response && error.response.data) {
      if (error.response.data.msg === '需要登录') {
        // 修改当前的登陆状态
        vuex.state.isLogin = false
      } else {
        console.log('错误信息:', error.response.data.msg || error.response.data.message)
      }
    }

    return Promise.reject(error)
  })

  // 判断是否有参数
  if (params) {
    return instance.get(url, { params })
  } else {
    return instance.get(url)
  }
}
