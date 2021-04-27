import axios from 'axios'
import React, { CSSProperties, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './style/NavBar.css'
import HomeIcon from '@material-ui/icons/Home';

export default function NavBar() {
    const [username, setUserName] = useState('');
    const [userRole, setUserRole] = useState('')
    const history = useHistory()

    const makeRequest = async () => {
        try {
            const response = await axios.get('/api/users/loggedIn')
            const result = response.data
            setUserName(result)
        } catch (error) {
            return error
        }
    }

    const roleRequest = async () => {
        try {
            const response = await axios.get('/api/users/loggedIn/role')
            const result = response.data
            setUserRole(result)
        } catch (error) {
            return error
        }
    }

    useEffect(() => {
        makeRequest()
        roleRequest()
    })
    
    const logOutRequest = async () => {
        try {
            await axios.delete('/api/users/logout')
            history.push('/userSelect')
        } catch (error) {
            history.push('/userSelect')
            return error
        }
    }
    return (
        <div className="header">
            <div className="avatarContainer">
                {username ?
                <Link to="/profile">
                    <div className="profilePic"></div>
                </Link>
                :
                    <div className="profilePic"></div>
                }
                <div className="userName">
                    {username ? 
                    <h3>{username}</h3>
                    :
                    <Link to="/userSelect"><h4>Sign in...</h4></Link>
                    }
                </div>
            </div>
            <div className="homeDiv">
               <Link to="/">
                    <HomeIcon style={icon}/>
                </Link> 
            </div>
            <div className="logoutContainer">
                {userRole === 'admin' ?
                <Link to="/admin">
                    <p>Admin</p>
                </Link>
                :
                    <>
                    </>
                }
                <button onClick={logOutRequest}>Log out</button>
        </div>
      </div>
    );
}

const icon: CSSProperties = {
    color: '#E955BF',
    fontSize: '3rem'
}
