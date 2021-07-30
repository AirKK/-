import VueRouter from "vue-router"
import Login from '../pages/Login/login'
import Home from '@/pages/home'
import Layout from '@/pages/layout'


//创建并暴露一个路由器
const router = new VueRouter({
    routes: [{
        path: '/login',
        name: 'login',
        component: Login //组件不加引号
    },
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/home',
                name: 'home',
                component: Home
            }
        ]
    }
    ]
})
//创建路由守卫
router.beforeEach((to, from, next) => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    //如果前往的页面不是登录界面需要校验用户信息
    if (to.path != '/login') {
        //如果用户信息存在于本地存储中允许通过
        if (user) {
            next()
        } else {
            //没有登录信息跳转回登录页面
           this.$router.push('/login')
        }
    } else {
        next()
    }
})


export default router
