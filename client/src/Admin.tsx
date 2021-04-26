import NavBar from "./Navbar";
import '../src/style/Admin.css'
import { useEffect, useState } from "react";
import axios from "axios";

interface specificUser {
    _id: string
    userName: string
    role: string
    passWord: string
}

export default function Admin() {
    const [users, setUser] = useState([])
    const [role, setRole] = useState('')
    const [deleted, deletedUser] = useState('')

    const getRole = async () => {
        try {
            const response = await axios.get('/api/users/loggedIn/role')
            const result: string = response.data
            setRole(result)
        } catch (error) {
            
        }
    }

    const getUsers = async () => {
        try {
            const response = await axios.get('/api/users/allUsers')
            const result = response.data
            setUser(result)
        } catch (error) {
               
        }
    }

    const deleteUser = async (userId: string) => {
        try {
            const response = await axios.delete(`/api/users/deleteUser/${userId} `)
            const result = response.data
            deletedUser(result)
        } catch (error) {
            
        }
    }

   useEffect(() => {
       getRole()
       getUsers()
   })

    return(
        <div>
        <NavBar />
            {role === 'admin' ?
                <div className="adminContainer">
                    {users.map((user: specificUser) => 
                        <div className="userList">
                            <ul>
                                <li>{user.userName}</li>
                                <li>{user._id}</li>
                                <li>{user.role}</li>
                            </ul>
                            <button>Edit</button>
                            <button onClick={() => deleteUser(user._id)}>Delete</button>
                        </div>
                    )}
                </div>
            :
                <h2>You need to be admin to see this sensitive info</h2>
            }
        </div>
    )
}