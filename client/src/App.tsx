import React from 'react';
import logo from './logo.svg';
import './App.css';

import styled from "styled-components";
import GraphForm from './components/GraphForm';

function App() {
  return (
    <>
      <MainContainer>
        <Heading>
          Prices Visualization
        </Heading>
        <ContentContainer>
          <GraphForm />
        </ContentContainer>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: auto;
  height: 100vh;
  // background-color: tomato;
`

const Heading = styled.h1`
  margin: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`

const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex: 3;
  // background-color: purple;
`

export default App;
