import React, { Component, createContext } from "react";
import axios from "axios";

interface UserObject {
  userName: string,
  role: string,
  _id: string 
}

interface State {
  user: UserObject;
}

interface ContextProps extends State {
  fetchUser: () => void;
}

export const UserContext = createContext<ContextProps>({
  user: {userName: '', role: '', _id: ''},
  fetchUser: () => {}
});

class UserProvider extends Component<{}, State> {
  state: State = {
    user: { userName: "", role: "", _id: "" }
  };

  fetchUserSession = async () => {
    const request = await axios.get("/api/users/loggedIn");
    this.setState({ user: { userName: request.data.userName, role: request.data.role, _id: request.data.id } });
    return request;
  };

  componentDidMount = () => {
    this.fetchUserSession();
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          fetchUser: this.fetchUserSession
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserProvider;
