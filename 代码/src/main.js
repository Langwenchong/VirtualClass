// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//animate.css
import animated from 'animate.css'
Vue.use(animated)

//swiper.js
import Swiper from "swiper"

import 'swiper/dist/css/swiper.css'

// //echarts.is
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts;

Vue.use(ElementUI);

Vue.config.productionTip = false

// 路由守卫
router.beforeEach(function (to, from, next) {
  if (from.name != "login" && from.name != "root" && to.name === "login") {
    sessionStorage.setItem("userName", "");
    // sessionStorage.setItem("sessionId", "");
    sessionStorage.setItem("fid", "");
    sessionStorage.setItem("tid", "");
    sessionStorage.setItem("teacherUsername", "");
    sessionStorage.setItem("cname", "");
    sessionStorage.setItem("userStatus", "");
    sessionStorage.setItem("userImage", "");
    next();
  }
  if (from.name === `login` || from.name === `root`) {
    next();
  }
  // if (sessionStorage.getItem("userName") === `` && to.name != `login` && to.name != `root` && to.name != `register` && to.name != `forget`) {
  //   next({
  //     name: "login"
  //   });
  // }
  next();
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
