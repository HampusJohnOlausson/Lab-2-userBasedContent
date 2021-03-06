import axios from 'axios';
import React, { useContext } from 'react';
import { useState } from 'react';
import { AxiosContext } from '../Contexts/reqContext';
import '../style/Usertweet.css'

interface Post {
    tweet: string
}

function TweetsForm() {
    const [postValue, setPostValue] = useState("");
    const contextRequest = useContext(AxiosContext)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const post = {
            tweet: postValue
        }  
        makePostRequest(post);
        
    }

    const makePostRequest = async (post: Post) => {
        await axios.post("/api/posts", post);
        contextRequest.fetchAllTweets()
    }

    return (
        <div>
            <form action="/" className="formStyle" onSubmit={handleSubmit}>
                <h2 className="titleStyle">Send a tweet</h2>
                <div className="inputsHolder">
                    <textarea 
                        className="inputStyle" 
                        placeholder="What's on your mind..."
                        onChange={e => setPostValue(e.target.value)}
                        rows={4} 
                        />
                    <input className="btnStyle" type="submit" value="send"/>
                </div>
            </form>
        </div>
    );
}

export default TweetsForm
