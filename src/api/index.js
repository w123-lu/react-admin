/*
包含n个接口请求函数的模块
每个函数返回promise
 */
import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from "antd";
// 登陆
export const reqLogin = ({username,password}) => ajax({
  url: '/login',
  method: 'POST',
  data: {
    username,
    password
  }
})


/* 
封装获取指定城市的天气信息
使用jsonp请求
*/
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, data) => {
      if (!err && data.status === 'success') {
        const {
          dayPictureUrl,
          weather
        } = data.results[0].weather_data[0]
        resolve({
          dayPictureUrl,
          weather
        })
      } else {
        message.error('获取天气失败!')
        return new Promise(() => {})
      }

    })
  })
}

/* 
获取所有分类的列表
*/
export const reqCategorys = () => ajax('/manage/category/list')

/* 
添加分类
*/
export const reqAddCategory = (categoryName) => ajax.post('/manage/category/add', {
  categoryName
})

/* 
更新分类
*/
export const reqUpdateCategory = ({
  categoryId,
  categoryName
}) => ajax({
  url: '/manage/category/update',
  method: 'POST',
  data: {
    categoryId,
    categoryName
  }
})

/* 
获取商品分页列表
*/
export const reqProducts = (pageNum, pageSize) => ajax({
  url: '/manage/product/list',
  params: {
    pageNum,
    pageSize
  }
})


/* 
根据分类ID获取分类
*/

export const reqCategory = (id) => ajax({
  url: '/manage/category/onfo',
  params: {
    categoryId: id
  }
})

/* 
搜索获取商品分页列表
*/
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchType, // 搜索类型名称  'productName' / 'productDesc'
  searchName, // 搜索的关键字
}) => ajax({
  url: '/manage/product/search',
  params: {
    pageNum,
    pageSize,
    [searchType]: searchName // 参数名不是searchType, 而是这个变量的值
  }
})

/*
更新商品状态
*/

export const reqUpdateProductStatus = (productId, status) => ajax({
  url: '/manage/product/updateStatus',
  method: 'POST',
  data: {
    productId,
    status
  }
})

/* 
根据商品ID获取商品
*/
export const reqProductById = (id) => ajax({
  url: '/manage/product/info',
  params: {
    productId: id
  }
})
/* 
添加或更新商品
*/
export const reqAddUpdateProduct = (product) => ajax.post(
  '/manage/product/' + (product._id ? 'update' : 'add'),
  product
)

/* 
删除商品图片
*/
/* 
删除图片
*/
export const reqDeleteImg = (name) => ajax.post('/manage/img/delete', {
  name
})