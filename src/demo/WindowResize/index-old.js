/*
 * @Author: eyea
 * @Date: 2021-07-13 10:56:03
 * @Last Modified by: eyea
 * @Last Modified time: 2021-07-13 11:17:05
 */
import React from 'react'

const withWindowSize = Component => {
  // 产生一个高阶组件 WrappedComponent，只包含监听窗口大小的逻辑
  class WrappedComponent extends React.PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        size: this.getSize()
      }
    }
    componentDidMount() {
      window.addEventListener('resize', this.handleResize)
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize)
    }
    getSize() {
      return window.innerWidth > 1000 ? 'large' : 'small'
    }
    handleResize = () => {
      const size = this.getSize()
      this.setState({
        size
      })
    }
    render() {
      // 将窗口大小传递给真正的业务逻辑组件
      return <Component size={this.state.size} />
    }
  }
}

class MyComponent extends React.Component {
  render() {
    const { size } = this.props
    return (
      size === 'small' ? 'smallComponent' : 'largeComponent'
    )
  }
}
//  使用 withWindowSize 产生高阶组件，用于产生 size 属性传递给真正的业务组件
export default withWindowSize(MyComponent)
