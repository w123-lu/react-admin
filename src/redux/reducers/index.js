/* 
向外暴露一个总的reducer函数
*/
import { combineReducers } from "redux";

import user from './user'
import headerTitle from './header-title'

export default combineReducers({
  user,
  headerTitle,
})