import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Carousel.css'

class CarouselItem extends Component {
  static propTypes = {
    activeIndex: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      className: props.index === props.activeIndex ? 'active' : ''
    }
  }

  componentWillReceiveProps (nextProps) {
    const {
      index
    } = this.props

    if (index === nextProps.activeIndex) {
      this.setState({className: 'active'})
    } else {
      this.setState({className: ''})
    }
  }

  render () {
    const { item } = this.props
    const { className } = this.state

    return (
      <li className={`Carousel-item ${className}`}>
        {item}
      </li>
    )
  }
}

export default CarouselItem
