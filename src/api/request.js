import axios from "axios";
import nProgress from "nprogress";
import 'nprogress/nprogress.css'
import store from "@/store";

// console.log(nProgress); start done
const requests = axios.create({
    baseURL: '/api',
    timeout: 5000,
})

//请求拦截
requests.interceptors.request.use((config) => {
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    }
    if (store.state.user.token) {
        config.headers.token=store.state.user.token
    }
    //headers
    nProgress.start();
    return config;
})

//相应拦截
requests.interceptors.response.use((res) => {
    nProgress.done();
    return res.data;
}, (error) => {
    return Promise.reject(new error('failed'));
})

export default requests;