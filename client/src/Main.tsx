import HandleUser from "./HandleUser"
import HandleRegister from "./HandleRegister"
import Tweets from "./Tweets"
import { BrowserRouter as Router, Route } from "react-router-dom"
import React from "react"
import UserSelection from "./UserSelection"
import TweetsForm from "./TweetsForm"
import Navbar from "./Navbar"
import './style/TweetSection.css'
import TweetWrapper from "./TweetWrapper"
import ProfilePage from "./ProfilePage"


const Main = () => {
    return (
      <Router>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Route exact path="/">
            <UserSelection />
          </Route>
          <Route path="/login">
            <HandleUser />
          </Route>
          <Route path="/register">
            <HandleRegister />
          </Route>
          <div>
            <Navbar />
            <Route path="/profile">
              <ProfilePage />
            </Route>
            <Route path="/tweets">
              <div className="tweet">
                <div>
                  <TweetsForm />
                  <TweetWrapper />
                </div>
                <div className="allTweets">
                  <Tweets />
                </div>
              </div>
            </Route>
          </div>
        </div>
      </Router>
    );
}

export default Main

