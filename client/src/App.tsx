
import React from 'react';
import './App.css';
import Layout from './Components/Layout';
import { BrowserRouter } from 'react-router-dom'
import AxiosProvider from './Contexts/reqContext';
import UserProvider from './Contexts/userContext';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AxiosProvider>
          <Layout />
        </AxiosProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
