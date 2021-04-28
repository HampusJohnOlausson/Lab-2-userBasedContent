import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import './style/ProfilePage.css';
import UserTweets from './UserTweets';
import { AxiosContext } from './Contexts/reqContext';
import { TweetObject } from './TweetWrapper';

export default function ProfilePage () {
  const posts = useContext(AxiosContext);
  const [name, setName] = useState('')

    useEffect(() => {
      getInfo();
      posts.fetchTweets()
    })

    const getInfo = () => {
        axios
          .get("/api/users/loggedIn")
          .then((response) => {
            const data = response.data;
            setName(data);
            console.log(data);
          })
          .catch((error) => {
            window.alert('oops ')
          })
    }

        return (
          <div className="profileWrapper">
            <h2 className="title">Your Profile</h2>
            <div className="profileContainer">
              <div
                className="profileImage"
              />
              <h4 className="profileName">{name}</h4>
            </div>
            <div>
            <div>
                {posts.posts.map((post: TweetObject) => (
                    <UserTweets value={post}/>   
                ))}
            </div>
            </div>
          </div>
        );
}
