import React from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import  { actionCreaters } from './store'
import { actionCreaters as loginActionCreaters } from '../../pages/login/store'
import { Link } from 'react-router-dom'

import {
  HeaderWrapper,
  HeaderContent,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  Addition,
  Button,
  SearchWrapper
} from './style'

const Header = (props) => {

  return (
      <HeaderWrapper>
        <HeaderContent>
          <Link to='/'>
            <Logo />
          </Link>
          <Nav>
            <NavItem className="left active">首页</NavItem>
            <NavItem className="left">下载App</NavItem>
              {
                props.login ?
                  <NavItem onClick={props.logout} className="right">退出</NavItem> : 
                  <Link to='/login'>
                    <NavItem className="right">登录</NavItem>
                  </Link>
              }
            <NavItem className="right">
              <i className="iconfont">&#xe636;</i>
            </NavItem>
            <SearchWrapper>
              <CSSTransition
                in={props.focused}
                timeout={200}
                classNames="slide"
              >
                <NavSearch
                  className={props.focused ? 'focused' : ''}
                  onFocus={props.handleInputFocus}
                  onBlur={props.handleInputBlur}
                ></NavSearch>
              </CSSTransition>
              <i className="iconfont">&#xe614;</i>
            </SearchWrapper>
          </Nav>
          <Addition>
            <Link to='/write'>
              <Button className="writting">
                <i className="iconfont">&#xe615;</i>
                写文章
              </Button>
            </Link>
            <Button className="reg">注册</Button>
          </Addition>
        </HeaderContent>
      </HeaderWrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    focused: state.header.get('focused'),
    login: state.login.get('login')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus() {
      dispatch(actionCreaters.searchFocus())
    },
    handleInputBlur() {
      dispatch(actionCreaters.searchBlur())
    },
    logout() {
      dispatch(loginActionCreaters.logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
