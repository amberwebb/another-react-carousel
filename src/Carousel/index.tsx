import React, {useEffect, useState, useRef} from 'react';
import CarouselItem from './CarouselItem';
import styled from 'styled-components';
import { CarouselInterface } from "./types";

const CarouselComponent = styled.div`
  border: 1px solid #ccc;
  width: 100%;
  text-align: center;
`;

const CarouselInner = styled.ul`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: 0;
`;

const CarouselControls = styled.div`
  width: 100%;
  display: block;
  float: left;
  position: relative;
  margin-top: 10px;
`;

const CarouselNav = styled.div`
  height: 15px;
  width: 15px;
  background-color: ${(props: {index: number, activeIndex: number}) =>
    props.index === props.activeIndex ? '#999' : '#ccc'};
  border-radius: 50%;
  display: inline-block;
  margin: 3px;
`;

export default function Carousel(props: CarouselInterface) {
  const {autoScroll, autoScrollInterval, children} = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const rotate = useRef(0);

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
    };
  }, [activeIndex, children, autoScrollInterval, autoScroll]);

  function displayChildren() {
    return (
      children.map((child: any, index: number) => {
        return (
          <CarouselItem
            activeIndex={activeIndex}
            index={index}
            item={child}
            key={index}
          />
        );
      })
    );
  }

  function navigate(event: any) {
    const {current} = rotate;
    const index = event.currentTarget.getAttribute('data-index');
    setActiveIndex(parseInt(index, 10));
    if (current) {
      clearInterval(current);
    }
  }

  function renderControls() {
    if (children.length > 1) {
      return (
        children.map((child: any, index: number) => {
          return (
            <CarouselNav
              index={index}
              activeIndex={activeIndex}
              key={index}
              data-index={index}
              onClick={navigate}
            />
          );
        })
      );
    } else {
      return null;
    }
  }

  return (
    <CarouselComponent>
      <CarouselInner>
        {displayChildren()}
      </CarouselInner>
      <CarouselControls>
        {renderControls()}
      </CarouselControls>
    </CarouselComponent>
  );
}
