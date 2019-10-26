import React, { Component } from 'react'
import {Menu,Icon} from 'antd'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'


import {setHeaderTitle} from '../../../redux/action-creators/header-title'
import menuList from '../../../config/menu-config'
import logo from '../../../assets/images/logo.png'
import './index.less'

const {Item,SubMenu} = Menu
@connect(state => ({headerTitle: state.headerTitle}), {setHeaderTitle})
@withRouter  // LeftNav = withRouter(LeftNav)
class LeftNav extends Component {


  /* 
  使用reduce() + 递归调用 来生成多级菜单项的数组
  */
getMenuNodes_reduce = (menuList)=>{
return menuList.reduce((pre,item)=>{
   // 当前请求路径
  const path = this.props.location.pathname
  // 向pre添加<Item>
  if (!item.children) {
     // 如果当前请求的就是item对应的路径, 将当前title保存到state中
    if (item.key === path && this.props.headerTitle!==item.title) {
      this.props.setHeaderTitle(item.title)
    }
    pre.push((
      <Item key={item.key}>
      <Link to={item.key} onClick={() => this.props.setHeaderTitle(item.title)}>
        <Icon type={item.icon} />
        <span>{item.title}</span>
      </Link>
    </Item> 
    ))
  }else{ // 向pre添加<SubMenu>
    if (item.children.some(item =>item.key ===path )) {
      this.openKey = item.key
    }
    pre.push(
      <SubMenu
        key={item.key}
        title={
          <span>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </span>
        }
      >
        {this.getMenuNodes_reduce(item.children)} {/* 进行递归调用 */}
      </SubMenu>
    )
  }
  // 返回此次累计结果数据
  return pre
},[])
}
/* 
  使用map() + 递归调用 来生成多级菜单项的数组
  */


  gitMenuNodes = (menuList)=>{
    return menuList.map(item =>{
      // 返回<Item></Item>
      if (!item.children) {
        return(
          <Item key={item.key}>
          <Link to={item.key}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </Link>
        </Item>
        )
      }else{
        return(
          <SubMenu
          key={item.key}
          title={
            <span>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </span>
          }
        >
          {this.getMenuNodes(item.children)} {/* 进行递归调用 */}
        </SubMenu>
        )
      }
    })
  }


  render() {
    const menuNodes = this.getMenuNodes_reduce(menuList)
    const selectedKey = this.props.location.pathname
    const openKey = this.openKey
    console.log('left-nav render()', selectedKey, openKey) // 可能会执行多次
    return (
      <div className="left-nav">
      <div className="left-nav-header">
        <img src={logo} alt="logo"/>
        <h1>硅谷后台</h1>
      </div>

      <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={[openKey]}
        >
          { menuNodes }
      </Menu>
      </div>
    )
  }
}
export default LeftNav