import { Link } from 'react-router-dom'
import './style/HandleUser.css'
require('express-async-errors')


function UserSelection () {

    return(
        <div className="user-container">
            <h2>Welcome to Twittter</h2>
            <Link to ="/login">
                <button>Click here to login</button>
            </Link> 
            <Link to ="/register">
                <button>If no user click here to sign up</button>
            </Link> 
        </div>
    )
}


export default UserSelection;