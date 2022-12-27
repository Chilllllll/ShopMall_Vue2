import Vue from 'vue'
import App from './App.vue'
import router from './router'

import TypeNav from "@/components/TypeNav";
//全局注册组件（组件名，组件）
Vue.component(TypeNav.name, TypeNav)

import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)

//elementui
import { MessageBox} from 'element-ui';
// Vue.component(MessageBox.name,MessageBox)
Vue.use(MessageBox)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 测试
// import { reqCategoryList } from "@/api";
// reqCategoryList()

import store from './store';
import '@/mock/mockServe'

import "swiper/css/swiper.css";

import { reqGetSearchInfo } from "@/api";
// console.log(reqGetSearchInfo({}));
reqGetSearchInfo({})

import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)

import * as API from '@/api'

import dog from '@/assets/images/th.jpg'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload,{
  loading:dog
})

import '@/plugins/validate.js'

new Vue({
  render: h => h(App),
  // 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
