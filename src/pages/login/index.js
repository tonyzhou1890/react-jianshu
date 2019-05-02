import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoginWrapper, LoginBox, Input, Button } from './style'
import { actionCreaters } from './store'

class Login extends PureComponent {
  render() {

    const { loginStatus } = this.props
    if (!loginStatus) {
      return (
        <LoginWrapper>
          <LoginBox>
            <Input placeholder="账号" ref={(input) => {this.account = input}}></Input>
            <Input placeholder="密码" type="password" ref={(input) => {this.password = input}}></Input>
            <Button onClick={() => this.props.login(this.account, this.password)}>登录</Button>
          </LoginBox>
        </LoginWrapper>
      )
    } else {
      return <Redirect to="/" />
    }
    
  }
}

const mapState = (state) => ({
  loginStatus: state.login.get('login')
})

const mapDispatch = (dispatch) => ({
  login(accountEle, passwordEle) {
    dispatch(actionCreaters.login())
    console.log(accountEle.value, passwordEle.value)
  }
})

export default connect(mapState, mapDispatch)(Login)