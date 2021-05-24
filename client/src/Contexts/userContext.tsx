import React, { Component, createContext } from "react";
import axios from "axios";

export interface UserObject {
  userName: string,
  role: string,
  _id: string 
}

interface State {
  user: UserObject;
  allUsers: UserObject[]
}

interface ContextProps extends State {
  fetchUser: () => void;
  fetchUsers: () => void;
}

export const UserContext = createContext<ContextProps>({
  user: {userName: '', role: '', _id: ''},
  allUsers: [],
  fetchUser: () => {}, 
  fetchUsers: () => {}
});

class UserProvider extends Component<{}, State> {
  state: State = {
    user: { userName: "", role: "", _id: "" },
    allUsers: []
  };

  fetchUserSession = async () => {
    const request = await axios.get("/api/users/loggedIn");
    this.setState({ user: { userName: request.data.userName, role: request.data.role, _id: request.data.id } });
    return request;
  };

  fetchAllUsers = async () => {
    try {
      const response = await axios.get('/api/users/allUsers')
      const result = response.data
      this.setState({ allUsers: result })
    } catch (error) {
      console.log(error)   
    }
  }

  componentDidMount = () => {
    this.fetchUserSession();
  }

  componentDidUpdate = () => {
      this.fetchUserSession();
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          fetchUser: this.fetchUserSession,
          fetchUsers: this.fetchAllUsers
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserProvider;
