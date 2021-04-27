import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Tweets from "./Tweets";
import TweetsForm from "./TweetsForm";
import './style/TweetSection.css'

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