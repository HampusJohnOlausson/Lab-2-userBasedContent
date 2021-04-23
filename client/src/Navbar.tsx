import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import './style/NavBar.css'

export default function NavBar() {
    const [username, setUserName] = useState('');
    const history = useHistory()

    const makeRequest = async () => {
        try {
            const response = await axios.get('/api/users/loggedIn')
            const result = response.data
            console.log(result)
            setUserName(result)
        } catch (error) {
            return error
        }
    }

    useEffect(() => {
        makeRequest()
    })
    
    const logOutRequest = async () => {
        try {
            await axios.delete('/api/users/logout')
            history.push('/')
        } catch (error) {
            history.push('/')
            return error
        }
    }
    return (
        <div className="header">
            <div className="avatarContainer">
                <div className="profilePic"></div>
                <div className="userName">
                    <h3>{username}</h3>
                </div>
            </div>
            <div className="logoutContainer">
                <button onClick={logOutRequest}>Log out</button>
            </div>
        </div>
    )
}
