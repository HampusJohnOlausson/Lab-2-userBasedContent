import HandleUser from "./HandleUser"
import HandleRegister from "./HandleRegister"
import { BrowserRouter as Router, Route } from "react-router-dom"
import UserSelection from "./UserSelection"
import Navbar from "./Navbar"
import '../style/TweetSection.css'
import Admin from "./Admin"
import ProfilePage from "./ProfilePage"

import GeneralTweets from "./GeneralTweets"



const Main = () => {
    return (
      <Router>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Route exact path="/userSelect">
            <UserSelection />
          </Route>
          <Route path="/login">
            <HandleUser />
          </Route>
          <Route path="/register">
            <HandleRegister />
          </Route>
          <div>
            <Route path="/profile">
              <Navbar />
              <ProfilePage />
            </Route>
            <Route path="/admin">
                    <Admin/>
            </Route>
            <Route exact path="/">
               <GeneralTweets/>
            </Route>
          </div>
        </div>
      </Router>
    );
}

export default Main

