import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { CSSProperties } from 'react';
import UserTweets from './UserTweets';

export interface TweetObject {
    name: string,
    tweet: string,
    updatedAt: string

}

function TweetWrapper() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get("/api/posts/user/tweets");
            setPosts(request.data)
            return request
        }
        fetchData();
    }, []);

    return (
        <div style={rootStyle}>
            <div>
                <h2 style={titleStyle}>My recent tweets</h2>
                <div>
                    {posts.map((post: TweetObject) => (
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