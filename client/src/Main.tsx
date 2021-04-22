import HandleUser from "./HandleUser"
import HandleRegister from "./HandleRegister"
import Tweets from "./Tweets"
import { BrowserRouter as Router, Route } from "react-router-dom"
import React from "react"
import UserSelection from "./UserSelection"


const Main = () => {
    return (
        <Router>
            <div>
                <Route exact path="/">
                    <UserSelection/>
                </Route>
                <Tweets/>
                <Route path="/login">
                    <HandleUser/>
                </Route>
                <Route path="/register">
                    <HandleRegister/>
                </Route>
            </div>
        </Router>
    )
}

export default Main

