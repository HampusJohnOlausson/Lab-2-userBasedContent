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


const Main = () => {
    return (
        <Router>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Route exact path="/">
                    <UserSelection/>
                </Route>
                <Route path="/login">
                    <HandleUser/>
                </Route>
                <Route path="/register">
                    <HandleRegister/>
                </Route>
                <Route path="/tweets">
                    <Navbar/>
                    <div className="tweet">
                        <div>
                            <TweetsForm/>
                            <TweetWrapper/>
                        </div>
                        <div className="allTweets">
                            <Tweets/>
                        </div>
                    </div>
                </Route>
            </div>
        </Router>
    )
}

export default Main

