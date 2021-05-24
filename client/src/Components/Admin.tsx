import NavBar from "./Navbar";
import '../style/Admin.css'
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext, UserObject } from "../Contexts/userContext";

export default function Admin() {
    const [changed, changedUser] = useState({})
    const { fetchUsers, allUsers } = useContext(UserContext)
    const { user } = useContext(UserContext);

    const deleteUser = async (userId: string) => {
        try {
          await axios.delete(`/api/users/deleteUser/${userId} `)
        } catch (error) {
            console.log(error)
        }
        fetchUsers()
    }

    const changeUser = async (userId: string) => {
        try {
            await axios.put(`/api/users/changeRole/${userId}`, {
                role: changed
            })
        } catch (error) {
            console.log(error)
        }
        fetchUsers()
    }

   useEffect(() => {
      fetchUsers()
   },[fetchUsers])

    return (
      <div>
        <NavBar />
        {user.role === "admin" ? (
          <div className="adminContainer">
            {allUsers.map((user: UserObject) => (
              <div key={user.userName} className="userList">
                <ul>
                  <li>{user.userName}</li>
                  <li>{user._id}</li>
                  <li>{user.role}</li>
                </ul>
                <div className="changeRole">
                  <select
                    name="role"
                    defaultValue="Select role..."
                    onChange={(e) => {
                      const selectedRole = e.target.value;
                      changedUser(selectedRole);
                    }}
                  >
                    <option value="" disabled>
                      Select role...
                    </option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button onClick={() => changeUser(user._id)}>Submit</button>
                </div>
                <button onClick={() => deleteUser(user._id)}>
                  Delete user
                </button>
              </div>
            ))}
          </div>
        ) : (
          <h2>You need to be admin to see this sensitive info</h2>
        )}
      </div>
    );
}