import axios from 'axios';
import { useState } from 'react';
import './style/HandleUser.css'
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
            const response = await axios.post('/api/users/register',
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
            <h2>Sign up</h2>
                <h3>Username</h3>
                <input type="text" name="userName" onChange={e => setUserName(e.target.value)} id="username"/>
                <h3>Password</h3>
                <input type="password" name="passWord" onChange={e => setPassWord(e.target.value)} id="password"/>
                <h3>Confirm password</h3>
                <input type="password" name="passWord" onChange={e => setRePassWord(e.target.value)} id="repassword"/>
                <button onClick={submitedValues}>Sign up</button>
        </div>
    )
}


export default HandleRegister;