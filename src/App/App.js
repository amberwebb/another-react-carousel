import React, { Component } from 'react'
import Carousel from '../Carousel'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Carousel autoScroll autoScrollInterval={5000}>
          <p>Slide 1</p>
          <p>Slide 2</p>
          <p>Slide 3</p>
        </Carousel>
      </div>
    )
  }
}

export default App
