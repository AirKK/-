//封装请求模块（接口请求可能需要重用，实际工作中，接口非常容易变动，改起来麻烦）
import request from '@/utils/request.js'
//用户登录请求
export const loginRequest = (data) => {
   return request({
        method: "POST",
        url: "/mp/v1_0/authorizations",
        // data 用来设置 POST 请求体
        data
      })
}

// 获取用户资料(url多了个空格出现了跨域的错误)
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile',
    headers: {
    //   属性名和值都得看接口的要求
    //   属性名：Authorization，接口要求的
    //   属性值：Bearer空格token数据
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTg5ODg0NzIsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.zyTFq4P39OVvN_ilt1hI8aDLgyAwPLTQ_3Io7G3-mSo'
    },
    // 这里给请求头添加token通过axios的请求拦截器在封装request统一添加了
    
  })
}
