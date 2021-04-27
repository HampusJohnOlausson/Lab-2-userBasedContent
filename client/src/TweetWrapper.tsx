import { useContext } from 'react';
import { useEffect } from 'react';
import { CSSProperties } from 'react';
import { AxiosContext } from './Contexts/reqContext';
import UserTweets from './UserTweets';

export interface TweetObject {
    name: string,
    tweet: string,
    updatedAt: string,
    _id: string

}

function TweetWrapper() {    
    const posts = useContext(AxiosContext);

    useEffect(() => {
        posts.fetchTweets();
    });

    return (
        <div style={rootStyle}>
            <div>
                <h2 style={titleStyle}>My recent tweets</h2>
                <div>
                    {posts.posts.map((post: TweetObject) => (
                        <UserTweets value={post}/>   
                    ))}
                </div>
            </div>
        </div>
    )
}

const rootStyle: CSSProperties = {
    width: "35rem",
}

const titleStyle: CSSProperties = {
    color: "#E955BF",
    fontSize: "2rem",
}

export default TweetWrapper