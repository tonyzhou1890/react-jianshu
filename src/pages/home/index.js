import React, { Component } from 'react'
import { connect } from 'react-redux'
import Topic from './components/Topics'
import List from './components/List'
import Recommend from './components/Recommend'
// import Writer from './components/Writer'
import { HomeWrapper, HomeLeft, HomeRight, BackTop } from './style'
import { actionCreaters } from './store'

class Home extends Component {

  componentDidMount() {
    this.props.changeHomeData()
    this.bindEvents()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.props.changeScrollTopShow)
  }

  handleScrollTop() {
    window.scrollTo(0, 0)
  }

  bindEvents() {
    window.addEventListener('scroll', this.props.changeScrollTopShow)
  }

  render() {
    return (
      <HomeWrapper>
        <HomeLeft>
          <img
            alt="banner"
            className="banner-img"
            src="https://upload.jianshu.io/admin_banners/web_images/4592/22f5cfa984d47eaf3def6a48510cc87c157bf293.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"></img>
          <Topic />
          <List />
        </HomeLeft>
        <HomeRight>
          <Recommend />
          {/* <Writer /> */}
        </HomeRight>
        { this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop> : '' }
      </HomeWrapper>
    )
  }
}

const mapState = (state) => ({
  showScroll: state.home.get('showScroll')
})

const mapDispatch = (dispatch) => ({
  changeHomeData() {
    const action = actionCreaters.getHomeInfo()
    dispatch(action)
  },
  changeScrollTopShow() {
    if (document.documentElement.scrollTop > 100) {
      dispatch(actionCreaters.toggleTopShow(true))
    } else {
      dispatch(actionCreaters.toggleTopShow(false))
    }
  }
})

export default connect(mapState, mapDispatch)(Home)