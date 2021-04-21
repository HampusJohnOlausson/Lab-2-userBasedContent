import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Layout from './Layout';

function App() {
  // const request = async () => {
  //   const response = await axios.post('/api/users/login', {
  //       "userName": "Hampus",  
  //       "passWord": "12341234"
  //   })
  //   const result = response.data
  //   console.log(result)
  // }
  // request()
  return (
    <div className="App">
      <Layout/>
    </div>
  );
}

export default App;
