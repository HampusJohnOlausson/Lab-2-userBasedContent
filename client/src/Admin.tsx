import NavBar from "./Navbar";
import '../src/style/Admin.css'
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./Contexts/userContext";

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
    const [changed, changedUser] = useState({})


    const userContext = useContext(UserContext);

    // const getRole = async () => {
    //     try {
    //         const response = await axios.get('/api/users/loggedIn/role')
    //         const result: string = response.data
    //         setRole(result)
    //     } catch (error) {
            
    //     }
    // }

    const fetchContext = () => {
        setRole(userContext.user.role);
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

    const changeUser = async (userId: string) => {
        try {
            await axios.put(`/api/users/changeRole/${userId}`, {
                role: changed
            })
        } catch (error) {
            
        }
    }

   useEffect(() => {
    //    getRole()
       getUsers();
       fetchContext();
   })

    return(
        <div>
        <NavBar />
            {role === 'admin' ?
                <div className="adminContainer">
                    {users.map((user: specificUser) => 
                        <div key={user.userName} className="userList">
                            <ul>
                                <li>{user.userName}</li>
                                <li>{user._id}</li>
                                <li>{user.role}</li>
                            </ul>
                            <div className="changeRole">
                                <select name="role" onChange={(e) => {
                                    const selectedRole = e.target.value
                                    changedUser(selectedRole)
                                }}>
                                    <option value="" disabled selected>Select role...</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <button onClick={() => changeUser(user._id)}>Submit</button>
                            </div>
                            <button onClick={() => deleteUser(user._id)}>Delete user</button>
                        </div>
                    )}
                </div>
            :
                <h2>You need to be admin to see this sensitive info</h2>
            }
        </div>
    )
}