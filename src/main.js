// 项目的入口文件

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/main.js'
import store from './store'
//加载全局样式
import './styles/index.css'

//导入Element组件库
import ElementUI from 'element-ui'


// 加载 element 组件库的样式
import 'element-ui/lib/theme-chalk/index.css'

//关闭Vue的生产提示
Vue.config.productionTip = false

//全局注册 element 组件库
Vue.use(ElementUI)

Vue.use(VueRouter)//应用插件

//创建vue实例
// 添加router配置
// 使用render方法将app根组件渲染到页面上
new Vue({
  render: h => h(App),
  router,
  store,
  //安装全局事件总线
  beforeCreate() {
    Vue.prototype.$bus=this
  }
}).$mount('#app')
