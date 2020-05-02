import React from 'react';
import Carousel from '../Carousel';
import styled from 'styled-components';
import {images} from './images';

const AppContainer = styled.div`
  padding: 50px;
  width: 960px;
  margin: 0 auto;
`;

export default function App() {
  return (
    <AppContainer>
      <Carousel autoScroll autoScrollInterval={5000}>
        {
          images.map((image, index) => {
            const {src, alt} = image;
            return (
              <img src={src} alt={alt} key={index} />
            );
          })
        }
      </Carousel>
    </AppContainer>
  );
}
