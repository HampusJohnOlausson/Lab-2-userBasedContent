import axios from 'axios';
import { useState } from 'react';
import './style/HandleUser.css'
require('express-async-errors')
interface apiBody  {
    userName: string, 
    passWord: string
}

function HandleUser () {
    const [username, setUserName] = useState('')
    const [password, setPassWord] = useState('')
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
            console.log(result)
            
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return(
        <div className="user-container">
                <h3>Username</h3>
                <input type="text" name="userName" onChange={e => setUserName(e.target.value)} id="username"/>
                <h3>Password</h3>
                <input type="password" name="passWord" onChange={e => setPassWord(e.target.value)} id="password"/>
                <button onClick={submitedValues}>Log in</button>
        </div>
    )
}


export default HandleUser;