import React, { useContext } from "react";
import Navbar from "./Navbar";
import Tweets from "./Tweets";
import TweetsForm from "./TweetsForm";
import '../style/TweetSection.css'
import { UserContext } from "../Contexts/userContext";

export default function GeneralTweets() {
  const userContext = useContext(UserContext)
    
    return(
        <div>
        <Navbar/>
        {!userContext.user.userName  
        ? 
        <div className="tweet">
            <Tweets />
        </div>
        :
        <div className="tweet">
            <TweetsForm />
            <Tweets />
        </div>
        }
        </div>
    )
}