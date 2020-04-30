import React, { useEffect, useState } from 'react';
import './Carousel.css';

export default function CarouselItem(props) {
  const { index, activeIndex, item } = props;
  const [className, setClassName] = useState(props.index === props.activeIndex ? 'active' : '');

  useEffect(() => {
    if (index === activeIndex) {
      setClassName('active');
    } else {
      setClassName('');
    }
  }, [index, activeIndex]);

  return (
    <li className={`Carousel-item ${className}`}>
      {item}
    </li>
  );
}
