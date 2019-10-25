/*
包含n个接口请求函数的模块
每个函数返回promise
 */
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from "antd";
// 登陆
export const reqLogin = ({username, password}) => ajax({
  url: '/login',
  method: 'POST',
  data: {username, password}
} )



export const reqUsers = () => ajax({
  url: '/manage/user/list',
  method: 'GET',
})

/* 
封装获取指定城市的天气信息
使用jsonp请求
*/
export const reqWeather = (city)=>{
return new Promise ((resolve,reject)=>{
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
  jsonp(url, {}, (err, data)=>{
    if (!err && data.status === 'success') {
      const {dayPictureUrl, weather} = data.results[0].weather_data[0]
      resolve({dayPictureUrl, weather})
    }else{
      message.error('获取天气失败!')
      return new Promise(()=>{})
    }

  })
})
}


export const reqCategorys = () => ajax('/manage/category/list')