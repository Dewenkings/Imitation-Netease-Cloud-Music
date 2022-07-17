import axios from 'axios'
import vuex from '../store/index'

// 页面优化进度条--导入NProgress包对应的JS和CSS
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 该项目所有请求均为 get请求
export function request (url, params) {
  // 请求超过30秒则判定为超时
  const instance = axios.create({
    baseURL: '/api',
    // timeout: 30000,
    // 当被监听就启用已有接口进行展示
    // baseURL: 'http://124.221.63.19:3000/',
    // baseURL: 'http://localhost:3000/',
    // baseURL: 'https://autumnfish.cn/',
    // devServer: {
    //   proxy: {
    //     '/api': {
    //       target: 'http://localhost:8000',
    //       changeOrigin: true,
    //       pathRewrite: {
    //         '/api': ''
    //       }
    //     }
    //   }
    // },
    // http://localhost:8000
    timeout: 30000,
    // 创建实例
    withCredentials: true
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
    // 对响应数据做点什么
    nProgress.done()
    return response
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log('出错了')
    console.log([error])
    if (error.response.data.msg === '需要登录') {
      // 修改当前的登陆状态
      vuex.state.isLogin = false
    } else {
      console.log(error.response.data.msg)
    }
  })

  // 设置实例默认携带身份认证
  instance.defaults.withCredentials = true
  // 判断是否有参数
  if (params) {
    params = {
      params: params
    }
    return instance.get(url, params)
  } else {
    return instance.get(url)
  }
}
