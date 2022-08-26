import React from 'react';
import logo from './logo.svg';
import './App.css';

import styled from "styled-components"

function App() {
  return (
    <>
      <MainContainer>
        <Heading>
          Prices Visualization
        </Heading>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`

const Heading = styled.h1`
  
`

export default App;
