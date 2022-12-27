/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail"
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import store from "@/store";
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
//二级路由
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

let router = new VueRouter({
    routes: [
        {
            path: '/center',
            component: Center,
            meta: { show: true },
            children: [
                {
                    path: 'myorder',
                    component: MyOrder
                },
                {
                    path: 'grouporder',
                    component: GroupOrder
                }, {
                    path: '/center',
                    redirect: '/center/myorder'
                }
            ]
        },
        {
            path: '/paysuccess',
            component: PaySuccess,
            meta: { show: true },
            beforeEnter: (to, from, next) => {
                // ...
                if (from.path=='/pay') {
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            path: '/pay',
            component: Pay,
            meta: { show: true },
            beforeEnter: (to, from, next) => {
                // ...
                if (from.path=='/trade') {
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            path: '/trade',
            component: Trade,
            meta: { show: true },
            //路由独享守卫
            beforeEnter: (to, from, next) => {
                // ...
                if (from.path=='/shopcart') {
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            path: '/home',
            component: Home,
            meta: { show: true }
        },
        {
            // path: '/search/:keyword?',指定params参数可传可不传
            path: '/search/:keyword?',
            component: Search,
            meta: { show: true },
            name: 'search',
            // props:true 布尔
            // props:{a:1} 对象
            // 函数
            // prop:($route)=>{
            // return{keyword:$route.params.keyword,k:$route.query.k}
            // }
        },
        {
            path: '/login',
            component: Login,
            meta: { show: false }

        },
        {
            path: '/register',
            component: Register,
            meta: { show: false }

        },
        {
            path: '/',
            redirect: '/home',
            meta: { show: true }

        },
        {
            path: '/detail/:skuId',
            component: Detail,
            meta: { show: true }

        }, {
            path: '/addcartsuccess',
            name: 'addcartsuccess',
            component: AddCartSuccess,
            meta: { show: true }

        }, {
            path: '/shopcart',
            name: 'shopcart',
            component: ShopCart,
            meta: { show: true }

        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }


});
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    let loginName = store.state.user.userInfo.loginName
    //已登录
    if (token) {
        //已登录想去login
        if (to.path == '/login') {
            next('/home')
        } else {
            //去非login页面
            //已有用户名
            if (loginName) {
                next()
            } else {
                //无用户信息，派发action
                try {
                    await store.dispatch('UserInfo')
                    next()
                } catch (error) {
                    //token失效
                    // alert(error.message)
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        //未登录，不能去交易/支付/个人中心
        //可以去home/search/shopcart
        let toPath = to.path
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            next('/login?redirect=' + toPath)
        } else {
            next()

        }
    }
})

export default router;