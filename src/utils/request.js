//基于axios封装的请求模块
import axios from 'axios'
//导入JSON-bigint
import Jsonbigint from 'json-bigint'
// 创建一个 axios 实例
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',
  //
  transformResponse: [function (data) {
    //axios会默认使用JSON.parse对数据进行转换当id数值过大便会出现错误
    //使用json-bigint可以解决
    //使用try-catch捕捉错误，处理异常
    try {
      return Jsonbigint.parse(data)
    } catch (err) {

      return data
    }

  }],
})
// 请求拦截器
request.interceptors.request.use(
  // 任何所有请求会经过这里
  // config 是当前请求相关的配置信息对象
  function (config) {
    //给请求头统一添加token
    const user = JSON.parse(window.sessionStorage.getItem('user'))
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // return config 后请求才会发出去
    return config
  },
  // 请求失败，会经过这里
  function (error) {
    return Promise.reject(error)
  }
)
export default request

// 谁要使用谁就加载 request 模块
// import request from 'request.js'
// request.xxx或者
// request({
//   method: ,
//   url: ''
// })