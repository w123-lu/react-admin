/*
封装axios
  1. 统一处理请求异常
  2. 异步请求成功的数据不是response, 而是response.data
*/

import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '../redux/store'
import { removeUserToken } from "../redux/action-creators/user";
import history from '../history'

//创建一个instance
const instance = axios.create({
  timeout:10000 //超时时间是10s
})

// 添加请求拦截器
instance.interceptors.request.use(config =>{
  console.log('request interceptor onResolved()')
   // 显示请求进度
  NProgress.start()
   // 1). 将post/put请求的data对象数据转换为urlencode格式的字符串数据
const {data} = config
if (data instanceof Object) {
  config.data = qs.stringify(data)
}

// 5). 如果有token , 添加到请求头中: Authorization
const token = store.getState().user.token
if (token) {
  config.headers['Authorization'] = 'atguigu_' +token
}
return config
})


// 添加一个响应拦截器
instance.interceptors.response.use(
  response => {
    console.log('response interceptor onResolved()')
// 隐藏请求进度
    NProgress.done()
    const result = response.data
    return result
  },
  error =>{
    console.log('response interceptor onRejected()')
    NProgress.done()
    /* 
    3).统一处理请求异常, 外部调用者不用再处理请求异常
    */
    const{status, data:{msg}={}}= error.response;
    if (status === 401) {
      if (history.location.pathname !=='/login') {
        //显示提示
        message.error(msg)
        store.dispatch(removeUserToken())
      }
    }else if(status ===404 ){
message.error('请求资源不存在')
    }else {
      message.error('请求出错: ' + error.message)
    }
    
    return new Promise(() => {})
  }
)
export default instance