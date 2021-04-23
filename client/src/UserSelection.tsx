import { Link } from 'react-router-dom'
import './style/HandleUser.css'
require('express-async-errors')

function UserSelection () {

    return(
        <div className="user-container">
            <div className="imageContainer"></div>
            <div className="btnContainer">
            <Link to ="/login">
                <button>Login</button>
            </Link> 
            <Link to ="/register">
                <button>Sign up</button>
            </Link> 
            </div>
        </div>
    )
}


export default UserSelection;