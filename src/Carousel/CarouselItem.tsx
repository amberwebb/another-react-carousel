import React from 'react';
import styled, {keyframes} from 'styled-components';
import { CarouselItemInterface } from "./types";

const fadeIn = keyframes`
  from {
      opacity: 0;
  }
  to {
      opacity: 1;
  }
`;

const Item = styled.li`
  display: ${(props: CarouselItemInterface) => props.index === props.activeIndex ? 'block' : 'none'};
  animation: ${fadeIn} 2s;
  -moz-animation: ${fadeIn} 2s;
  -webkit-animation: ${fadeIn} 2s;
  -o-animation: ${fadeIn} 2s;
`;

export default function CarouselItem(props: CarouselItemInterface) {
  return (
    <Item {...props}>
      {props.item}
    </Item>
  );
}
