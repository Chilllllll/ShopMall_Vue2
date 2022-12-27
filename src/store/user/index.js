/* eslint-disable no-unused-vars */
import { reqGetCode, reqUserLogin, reqUserRegister, reqUserInfo, reqLogout } from "@/api";
import { getToken, setToken, removeToken } from '@/utils/token.js'
let state = {
    code: '',
    token: getToken()||'',
    userInfo: {}
}
let mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    USERLOGOUT(state) {
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}
let actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        //    console.log(result);
        if (result.code == 200) {
            commit('GETCODE', result.data);
            return 'ok'
        } else {
            Promise.reject(new Error(result.message))
        }
    },
    //用户注册
    async userRegister({ commit }, data) {
        let result = await reqUserRegister(data)
        //    console.log(result);
        if (result.code == 200) {
            return 'ok';
        } else {
            Promise.reject(new Error(result.message))
        }
    },
    //用户登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        // console.log(result);
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            setToken(result.data.token)

            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }

    },
    //获取用户信息
    async UserInfo({ commit }) {
        let result = await reqUserInfo();
        // console.log(result);
        if (result.code == 200) {
            commit('USERINFO', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //退出登录
    async userLogout({ commit }) {
        let result = await reqLogout();
        console.log(result);
        if (result.code == 200) {
            commit('USERLOGOUT')
            return 'ok'
        } else {
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