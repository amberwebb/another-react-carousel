import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CarouselItem from './CarouselItem'
import './Carousel.css'

class Carousel extends Component {
  static propTypes = {
    autoScroll: PropTypes.bool,
    autoScrollInterval: PropTypes.number,
    children: PropTypes.node.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      activeIndex: 0,
      autoScroll: props.autoScroll,
    }
  }

  componentDidMount () {
    const { autoScrollInterval, children } = this.props
    const { autoScroll } = this.state

    if (autoScroll && children.length > 1) {
      this.rotate = setInterval(() => {
        this.setState({
          activeIndex: this.getAutoIndex()
        })
      }, autoScrollInterval)
    }
  }

  componentWillUnmount () {
    if (this.rotate) {
      clearInterval(this.rotate)
    }
  }

  getAutoIndex = () => {
    const { activeIndex } = this.state
    const lastIndex = this.props.children.length - 1
    let autoIndex

    if (activeIndex === 0) {
      autoIndex = activeIndex + 1
    } else if (activeIndex === lastIndex) {
      autoIndex = 0
    } else {
      autoIndex = activeIndex + 1
    }

    return autoIndex
  }

  displayChildren = () => {
    const {
      activeIndex
    } = this.state

    return (
      this.props.children.map((child, index) => {
        return (
          <CarouselItem
            activeIndex={activeIndex}
            index={index}
            item={child}
            key={index}
          />
        )
      })
    )
  }

  navigate = (event) => {
    const index = event.currentTarget.getAttribute('data-index')
    this.setState({
      activeIndex: parseInt(index, 10)
    }, () => {
      if (this.rotate) {
        clearInterval(this.rotate)
      }
    })
  }

  renderControls = () => {
    const children = this.props.children
    const activeIndex = this.state.activeIndex

    if (children.length > 1) {
      return (
        children.map((child, index) => {
          return (
            <a
              className={index === activeIndex ? 'Carousel-navDot Carousel-navDot-active' : 'Carousel-navDot'}
              key={index}
              data-index={index}
              onClick={this.navigate}
            >
            </a>
          )
        })
      )
    } else {
      return null
    }
  }

  render () {
    return (
      <div className='Carousel'>
        <ul className='Carousel-inner'>
          {this.displayChildren()}
        </ul>
        <div className='Carousel-controls'>
          {this.renderControls()}
        </div>
      </div>
    )
  }
}

export default Carousel
