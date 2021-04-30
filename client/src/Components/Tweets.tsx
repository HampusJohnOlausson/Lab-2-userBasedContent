import { useContext } from 'react'
import "../style/Tweet.css";
import { AxiosContext } from '../Contexts/reqContext';
import AxiosPutBtn from '../axiosRequests/AxiosPutBtn';
import AxiosDltBtn from '../axiosRequests/AxiosDltBtn';
import { UserContext } from '../Contexts/userContext';
import { useEffect } from 'react';
import { useState } from 'react';

export interface TweetObject {
      name: string,
      tweet: string,
      updatedAt: string,
      _id: string
}

export default function Tweets() {

  const tweetContext = useContext(AxiosContext);
  const userContext = useContext(UserContext);

  const [role, setRole] = useState('');
  const [userName, setuserName] = useState('');

  useEffect(() => {
    fetchRole();
    fetchName();
    tweetContext.fetchAllTweets(); 
  });

  const fetchRole = () => {
    setRole(userContext.user.role);
  };

  const fetchName = () => {
    setuserName(userContext.user.userName);
  }

  

    return (
      <div className="tweetWrapper">
        <h1 className="titlePage">Tweets</h1>
        <div className="tweetSection">
          {tweetContext.allPosts.map((post: TweetObject) => (
            <div className="tweetContainer" key={post._id}>
              <h3 className="userName">@{post.name}</h3>
              <h5 className="tweetParagraph">{post.tweet}</h5>
              <span className="timeAndDate">{post.updatedAt.substring(0, post.updatedAt.indexOf(".") + 1).replace("T", " - ")}</span>
              {role === 'admin' || post.name === userName?
                <div className="lowerSection">
                  <AxiosDltBtn value={post}/>
                  <AxiosPutBtn value={post}/>
                </div>
              : 
                <></>  
              }
            </div>
          ))}
        </div>
      </div>
    );
}