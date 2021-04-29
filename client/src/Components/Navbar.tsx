import axios from 'axios'
import React, { CSSProperties, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import '../style/NavBar.css'
import HomeIcon from '@material-ui/icons/Home';
import { UserContext } from '../Contexts/userContext';

export default function NavBar() {
    const userContext = useContext(UserContext)

    const history = useHistory()

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
                {userContext.user.userName ?
                <Link to="/profile">
                    <div className="profilePic"></div>
                </Link>
                :
                    <div className="profilePic"></div>
                }
                <div className="userName">
                    {userContext.user.userName ? 
                    <h3>{userContext.user.userName}</h3>
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
                {userContext.user.role === 'admin' ?
                <Link to="/admin">
                    <p>Admin</p>
                </Link>
                :
                    <>
                    </>
                }
                {userContext.user.userName? 
                <button onClick={logOutRequest}>Log out</button>
                :
                <div className="userNavigation">
                    <Link to="/register">
                        <button>Sign up</button>
                    </Link>
                    <Link to="/login">
                        <button>Log in</button>
                    </Link>
                </div>
                }
        </div>
      </div>
    );
}

const icon: CSSProperties = {
    color: '#E955BF',
    fontSize: '3rem'
}
