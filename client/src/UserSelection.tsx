import { Link } from 'react-router-dom'
import './style/HandleUser.css'
require('express-async-errors')


function UserSelection () {

    return (
      <div>
        <h2 style={{textAlign: 'center'}}>Welcome to Twittter</h2>
        <div className="user-container">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
    );
}


export default UserSelection;