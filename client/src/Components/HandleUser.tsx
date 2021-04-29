import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';
import '../style/HandleUser.css'
require('express-async-errors')
interface apiBody  {
    userName: string, 
    passWord: string
}

function HandleUser () {
    const [username, setUserName] = useState('')
    const [password, setPassWord] = useState('')
    let history = useHistory()

    const submitedValues = () => {
        const body = {
            userName : username, 
            passWord : password
        }
        setPassWord(body.passWord)
        makeRequest(body)   
    }

    const makeRequest = async (body: apiBody) => {
        try {
            const response = await axios.post('/api/users/login',
            body
            )
            const result = response.data
            console.log(result);
            history.push('/');  
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
      <div className="login-container" id="user-container">
        <div className="imageContainer"></div>
        <h3>Username</h3>
        <input
          placeholder="Your username..."
          className="input"
          type="text"
          name="userName"
          onChange={(e) => setUserName(e.target.value)}
          id="username"
        />
        <h3>Password</h3>
        <input
          placeholder="Your password..."
          className="input"
          type="password"
          name="passWord"
          onChange={(e) => setPassWord(e.target.value)}
          id="password"
        />
        <button onClick={submitedValues}>Log in</button>
        <div id="error"></div>
      </div>
    );
}


export default HandleUser;