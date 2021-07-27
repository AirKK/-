// 项目的入口文件

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/main.js'
import store from './store'
//关闭Vue的生产提示
Vue.config.productionTip = false
Vue.use(VueRouter)//应用插件
//创建vue实例
// 添加router配置
// 使用render方法将app根组件渲染到页面上
new Vue({
  render: h => h(App),
  store
}).$mount('#app')
