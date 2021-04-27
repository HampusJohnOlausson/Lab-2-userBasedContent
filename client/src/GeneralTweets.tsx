import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Tweets from "./Tweets";
import TweetsForm from "./TweetsForm";
import TweetWrapper from "./TweetWrapper";

export default function GeneralTweets() {

    const [loggedIn, setLoggedIn] = useState('')

    const makeRequest = async () => {
      try {
        const response = await axios.get('/api/users/loggedIn')
        const result = response.data
        setLoggedIn(result)
        console.log('TEST')
      } catch (error) {
        
      }
    }
  
    useEffect(() => {
      makeRequest()
    })
    
    return(
        <div>
        <Navbar/>
        {!loggedIn  
        ? 
        <div className="tweet">
          <div className="allTweets">
            <Tweets />
          </div>
          </div>
        :
        <div className="tweet">
            <div>
            <TweetsForm />
            <TweetWrapper />
          </div>
          <div className="allTweets">
            <Tweets />
          </div>
          </div>
        }
        </div>
    )
}