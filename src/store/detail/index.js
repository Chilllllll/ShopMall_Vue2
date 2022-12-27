import { reqGoodsInfo ,reqAddUpdateShopCart} from '@/api'
import { getUUID } from "@/utils/uuid_token";
//仓库存储数据的地方
let state = {
    goodsInfo: {},
    //游客
    uuid_token: getUUID()
};
//唯一可以修改仓库数据地方【工人】
let mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo;
    }
};
//可以处理业务逻辑【if、异步语句等等】
let actions = {
    async getGoodsInfo({ commit }, skuId) {

        let result = await reqGoodsInfo(skuId);
        //判断服务器返回的状态是200->成功
        if (result.code == 200) {
            //提交mutation存储服务器数据
            commit("GETGOODSINFO", result.data);
        }
    },
    // eslint-disable-next-line no-unused-vars
    async addUpdateShopCart({commit},{skuId,skuNum}){
        // eslint-disable-next-line no-unused-vars
        let result=  await reqAddUpdateShopCart(skuId,skuNum);
        // console.log('11111111111'+result);
        if (result.code == 200) {
            return 'ok';
            
        }else{
            return Promise.reject(new Error('failed'))
        }
    }

};
//仓库计算属性
let getters = {
    categoryView(state) {
        return state.goodsInfo.categoryView || {};
    },
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || []
    }
};

//对外暴露小仓库
export default {
    state,
    mutations,
    actions,
    getters
}

