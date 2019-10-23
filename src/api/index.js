/*
包含n个接口请求函数的模块
每个函数返回promise
 */
import ajax from './ajax'

// 登陆
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')