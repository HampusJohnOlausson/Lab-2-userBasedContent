import axios from 'axios'
import React, { Component } from 'react'
import './style/ProfilePage.css';

interface State {
    name: String,
}
export default class ProfilePage extends Component<{}, State> {

    state = {
        name: ''
    }

    componentDidMount(){
        this.getInfo();
    }

    getInfo = () => {
        axios
          .get("/api/users/loggedIn")
          .then((response) => {
            const data = response.data;
            this.setState({ name: data });
            console.log(data);
          })
          .catch((error) => {
            window.alert('oops ')
          })
    }

    render() {
        return (
          <div className="profileWrapper">
            <h2 className="title">Your Profile</h2>
            <div className="profileContainer">
              <div
                className="profileImage"
              />
              <h4 className="profileName">{this.state.name}</h4>
            </div>
          </div>
        );
    }
}
