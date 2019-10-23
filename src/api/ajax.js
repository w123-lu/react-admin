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


//创建一个instance
const instance = axios.create({
  timeout:10000 //超时时间是10s
})

// 添加请求拦截器
instance.interceptors.request.use(config =>{
  console.log('request interceptor onResolved()')
  NProgress.start()
const {data} = config
if (data instanceof Object) {
  config.data = qs.stringify(data)
}
return config
})


// 添加一个响应拦截器
instance.interceptors.response.use(
  response => {
    console.log('response interceptor onResolved()')

    NProgress.done()
    const result = response.data
    return result
  },
  error =>{
    console.log('response interceptor onRejected()')
    NProgress.done()
    message.error('请求出错:' +error.message)
    return new Promise(()=>{})

  }
)
export default instance