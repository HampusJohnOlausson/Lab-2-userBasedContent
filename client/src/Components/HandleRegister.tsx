import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';
import "../style/HandleUser.css";
require('express-async-errors')
interface apiBody  {
    userName: string, 
    passWord: string, 
    rePassword: string
}

function HandleRegister () {
    const [username, setUserName] = useState('')
    const [password, setPassWord] = useState('')
    const [reEntePassword, setRePassWord] = useState('')
    let history = useHistory()
    
    const submitedValues = () => {
        const body = {
            userName : username, 
            passWord : password,
            rePassword: reEntePassword
        }
        setPassWord(body.passWord)
        makeRequest(body)   
    }

    const makeRequest = async (body: apiBody) => {
        
        try {
            const response = await axios.post('/api/users/register', body)
            const result = response.data
            console.log(result)
            history.push('/login')
        } catch (error) {
            const p = document.createElement('p')
            const container = document.getElementById('error')
            if(container) {
                container.innerHTML = ''
            }
            p.innerHTML = error.response.data
            if(container) {
                container.appendChild(p)
            }
        }
    }

    return (
      <div className="user-container">
        <div className="imageContainer"></div>
        <h2>Sign up</h2>
        <h3>Username</h3>
        <input
          className="input"
          type="text"
          name="userName"
          placeholder="Your username..."
          onChange={(e) => setUserName(e.target.value)}
          id="username"
        />
        <h3>Password</h3>
        <input
          className="input"
          type="password"
          name="passWord"
          placeholder="Your password..."
          onChange={(e) => setPassWord(e.target.value)}
          id="password"
        />
        <h3>Confirm password</h3>
        <input
          placeholder="Confirm password..."
          className="input"
          type="password"
          name="passWord"
          onChange={(e) => setRePassWord(e.target.value)}
          id="repassword"
        />
        <button onClick={submitedValues}>Sign up</button>
        <div id="error"></div>
      </div>
    );
}


export default HandleRegister;