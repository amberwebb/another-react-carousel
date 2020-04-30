import React, { useEffect, useState, useRef } from 'react';
import CarouselItem from './CarouselItem';
import './Carousel.css';

export default function Carousel(props) {
  const { autoScroll, autoScrollInterval, children } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  let rotate = useRef(null);

  useEffect(() => {
    function getAutoIndex() {
      const lastIndex = children.length - 1;
      let autoIndex;

      if (activeIndex === 0) {
        autoIndex = activeIndex + 1;
      } else if (activeIndex === lastIndex) {
        autoIndex = 0;
      } else {
        autoIndex = activeIndex + 1;
      }

      return autoIndex;
    }

    if (autoScroll && children.length > 1) {
      rotate.current = setInterval(() => {
        setActiveIndex(getAutoIndex());
      }, autoScrollInterval);
    }

    return () => {
      if (rotate.current) {
        clearInterval(rotate.current);
      }
    }
  }, [activeIndex, children, autoScrollInterval, autoScroll]);

  function displayChildren() {
    return (
      children.map((child, index) => {
        return (
          <CarouselItem
            activeIndex={activeIndex}
            index={index}
            item={child}
            key={index}
          />
        );
      })
    )
  }

  function navigate(event) {
    const { current } = rotate;
    const index = event.currentTarget.getAttribute('data-index');
    setActiveIndex(parseInt(index, 10));
    if (current) {
      clearInterval(current)
    }
  }

  function renderControls() {
    if (children.length > 1) {
      return (
        children.map((child, index) => {
          return (
            <div
              className={index === activeIndex ? 'Carousel-navDot Carousel-navDot-active' : 'Carousel-navDot'}
              key={index}
              data-index={index}
              onClick={navigate}
            />
          );
        })
      )
    } else {
      return null;
    }
  }

  return (
    <div className='Carousel'>
      <ul className='Carousel-inner'>
        {displayChildren()}
      </ul>
      <div className='Carousel-controls'>
        {renderControls()}
      </div>
    </div>
  );
}
