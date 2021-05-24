import { useContext, useEffect } from 'react'
import '../style/ProfilePage.css';
import UserTweets from './UserTweets';
import { AxiosContext } from '../Contexts/reqContext';
import { TweetObject } from './Tweets';
import { UserContext } from '../Contexts/userContext';

export default function ProfilePage () {
  const posts = useContext(AxiosContext);
  const { fetchTweets } = useContext(AxiosContext)
  const { user } = useContext(UserContext)

    useEffect(() => {
      fetchTweets()
    },[fetchTweets])

    return (
      <div className="profileWrapper">
        <h2 className="title">Your Profile</h2>
        <div className="profileContainer">
          <div
            className="profileImage"
          />
          <h4 className="profileName">{user.userName}</h4>
        </div>
        <div>
        <div>
            {posts.posts.map((post: TweetObject) => (
                <UserTweets key={post._id} value={post}/>   
            ))}
        </div>
        </div>
      </div>
    );
}
