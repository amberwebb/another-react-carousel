import React from 'react';
import Carousel from '../Carousel';
import './App.css';

export default function App() {
  return (
    <div className='App'>
      <Carousel autoScroll autoScrollInterval={5000}>
        <img src="https://source.unsplash.com/user/erondu/930x600" alt=""/>
        <img src="https://source.unsplash.com/user/erondu/likes/930x600" alt="" />
        <img src="https://source.unsplash.com/collection/190727/930x600" alt="" />
      </Carousel>
    </div>
  );
}
