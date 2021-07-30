//基于axios封装的请求模块
import axios from 'axios'
// 创建一个 axios 实例
const request = axios.create({
    baseURL:'http://api-toutiao-web.itheima.net'
})
// 请求拦截器
request.interceptors.request.use(
    // 任何所有请求会经过这里
    // config 是当前请求相关的配置信息对象
    // config 是可以修改的
    function (config) {
      // 可以在发出请求之前定制统一业务功能处理
     //给请求头统一添加token
        const user =JSON.parse(window.localStorage.getItem('user')) 
        if (user) {
           config.headers.Authorization=`Bearer ${user.token}`
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