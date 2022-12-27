/* eslint-disable no-unused-vars */
import { reqAddressInfo ,reqOrderInfo} from '@/api'
let state = {
    address:[],
    orderInfo:{}
}
let mutations = {
    GETUSERADDRESS(state,address){
        state.address=address
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo=orderInfo
    }
}
let actions = {
    //用户地址
    async getUserAddress({commit}) {
        let result= await reqAddressInfo()
        // console.log(result);
        if (result.code==200) {
            commit('GETUSERADDRESS',result.data)
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    //交易页信息
    async getOrderInfo({commit}){
        let result= await reqOrderInfo()
        // console.log(result);
        if (result.code==200) {
            commit('GETORDERINFO',result.data)
        }else{
            return Promise.reject(new Error('failed'))
        }
    }

}

let getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}