//api接口进行统一管理

import requests from "./request"
import mockRequests from './mockAjax'

//1.三级联动 /api/product/getBaseCategoryList get 无参数 
export const reqCategoryList = () => {
    //发请求
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}

export const reqGetBannerList = () => {
    return mockRequests({
        url: '/banner',
        method: 'get'
    })
}

export const reqFloorList = () => {
    return mockRequests({
        url: '/floor',
        method: 'get'
    })
}

// 获取search
export const reqGetSearchInfo = (params) => requests({
    url: '/list',
    method: 'post',
    data: params
})

//获取detail
// /api/item/{ skuId }
// GET
export const reqGoodsInfo = (skuId) => requests({
    url: `item/${skuId}`,
    method: 'get',
})

//购物车
export const reqAddUpdateShopCart = (skuId, skuNum) => {
    return requests({
        url: `cart/addToCart/${skuId}/${skuNum}`,
        method: 'post',
    })
}
//获取购物车列表
export const reqCartList = () => requests({ url: 'cart/cartList', method: 'get' })

//删除购物车列表
export const reqDeleteCartById = (skuId) => requests({ url: `cart/deleteCart/${skuId}`, method: 'delete' })

//check
export const reqUpdateChecked = (skuId, isChecked) => requests({url: `cart/checkCart/${skuId}/${isChecked}`, method: 'get'})


//获取验证码
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

//用户注册
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', data, method: 'post' })

//用户登录
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })

//token获取用户信息
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

//退出登录
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })

//获取用户地址信息
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

//获取订单交易页信息
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })

//提交订单
export const reqSubmitOrder = (tradeNo,data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data,method: 'post' })

//支付信息
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`,method: 'get' })

//查询支付成果或者失败
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`,method: 'get' })

//获取我的订单列表
export const reqMyOrderList = (page,limit) => requests({ url: `/order/auth/${page}/${limit}`,method: 'get' })
