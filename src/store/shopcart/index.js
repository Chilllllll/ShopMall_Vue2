/* eslint-disable no-unused-vars */
import { reqCartList, reqDeleteCartById, reqUpdateChecked } from '@/api'
let state = {
    cartList: []
}
let mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
let actions = {
    //获取购物车列表
    async getCartList({ commit }) {
        let result = await reqCartList();
        // console.log(result);
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }

    },
    //删除产品
    async deleteCartById({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        // console.log(result);
        if (result.code == 200) {
            // commit('DELETECARTBYID',result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }

    },
    //修改产品状态
    async updateChecked({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateChecked(skuId, isChecked)
        console.log(result);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }

    },
    //删除全部选中产品
    deleteAllCheckedCart({ dispatch, getters }) {
        try {
            let PromiseAll = []
            getters.cartList.cartInfoList.forEach(item => {
                let promise = item.isChecked == 1 ? dispatch('deleteCartById', item.skuId) : '';
                PromiseAll.push(promise)
            })
            return Promise.all(PromiseAll)

        } catch (error) {
            alert(error.message)
        }
    },
    //修改全部产品勾选状态
    updateAllChecked({ dispatch, getters }, isChecked) {
        try {
            let PromiseAll = []
            getters.cartList.cartInfoList.forEach(item => {
                let promise = dispatch('updateChecked', {skuId:item.skuId,isChecked})
                PromiseAll.push(promise)
            })
            return Promise.all(PromiseAll)
        } catch (error) {
            alert(error.message)
        }
    }
}

let getters = {
    cartList(state) {
        return state.cartList[0] || {};
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}