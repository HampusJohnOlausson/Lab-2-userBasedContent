import axios from 'axios';
import { useState } from 'react';
import './style/HandleUser.css'

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
        makeRequest(body)
    }

    const makeRequest = async (body: apiBody) => {
        const response = await axios.post('/api/users/register',
        body
        )
        const result = response.data
        console.log(result)
    }

    return(
        <div className="user-container">
                <h3>Username</h3>
                <input type="text" name="userName" onChange={e => setUserName(e.target.value)} id="username"/>
                <h3>Password</h3>
                <input type="text" name="passWord" onChange={e => setPassWord(e.target.value)} id="password"/>
                <button onClick={submitedValues}>Log in</button>
        </div>
    )
}


export default HandleUser;