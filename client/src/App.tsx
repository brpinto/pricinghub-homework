import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from "styled-components";
import GraphForm from './components/GraphForm';
import ChartComponent from './components/Chart';
import FormFilterButton from './components/FormFilterButton';

function App() {
  
  return (
    <>
      <MainContainer>
        <Heading>
          <h1>Prices Visualization</h1>
          <FormFilterButton />
        </Heading>
        <ContentContainer>
          <GraphForm />
          <ChartComponent />
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

const Heading = styled.div`
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 15%;
  justify-content: space-evenly;
  width: 100%;
`

const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 3;
`

export default App;
