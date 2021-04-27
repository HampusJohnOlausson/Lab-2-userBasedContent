
import React from 'react';
import './App.css';
import Layout from './Layout';
import { BrowserRouter } from 'react-router-dom'
import AxiosProvider from './Contexts/reqContext';

function App() {
  return (
    <BrowserRouter>
      <AxiosProvider>
        <Layout/>
      </AxiosProvider>
    </BrowserRouter>
  );
}

export default App;
