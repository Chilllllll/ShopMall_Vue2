import axios from "axios";
import nProgress from "nprogress";
import 'nprogress/nprogress.css'
 

// console.log(nProgress); start done
const requests = axios.create({
    baseURL: '/mock',
    timeout: 5000,
})

//请求拦截
requests.interceptors.request.use((config) => {
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