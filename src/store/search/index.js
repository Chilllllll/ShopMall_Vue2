import { reqGetSearchInfo } from "@/api";
const state = {
    searchList: {}
}
const mutations = {
    GETSEARCHILIST(state, searchList) {
        state.searchList = searchList;
    }
}
const actions = {
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params)
        // console.log(result);
        if (result.code == 200) {
            commit('GETSEARCHILIST', result.data)
        }

    }
}
// 计算属性（简化数据）
const getters = {
    // state当前仓库
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList;
    },
    attrsList(state) {
        return state.searchList.attrsList;
    },
}

    export default {
        state,
        mutations,
        actions,
        getters
    }