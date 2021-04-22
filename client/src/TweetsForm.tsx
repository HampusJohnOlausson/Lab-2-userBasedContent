import axios from 'axios';
import React, { CSSProperties } from 'react';
import { useState } from 'react';

interface Post {
    tweet: string
}

function TweetsForm() {
    const [postValue, setPostValue] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const post = {
            tweet: postValue
        }
        
        makePostRequest(post);
    }

    const makePostRequest = async (post: Post) => {
        const response = await axios.post("/api/posts", post);
        console.log(response);
    }

    return (
        <div>
            <form action="/" style={formStyle} onSubmit={handleSubmit}>
                <h2 style={titleStyle}>Send a tweet</h2>
                <div style={inputsHolder}>
                    <input 
                        style={inputStyle} 
                        type="text" 
                        placeholder="What's on your mind..."
                        onChange={e => setPostValue(e.target.value)}
                        />
                    <input style={btnStyle} type="submit" value="+"/>
                </div>
            </form>
        </div>
    );
}

const formStyle: CSSProperties = {
    width: "25rem",
    height: "15rem"
}

const titleStyle: CSSProperties = {
    color: "#E955BF",
    fontSize: "2rem",
}

const inputsHolder: CSSProperties = {
    background: "#EDEDED",
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem",
    borderRadius: "0.4rem",
}

const inputStyle: CSSProperties = {
    fontSize: "1.3rem",
    padding: "0.8rem",
    border: "none",
    outline: "none",
    color: "#333",
    background: "#EDEDED",
    width: "100%"
}

const btnStyle: CSSProperties = {
    fontSize: "3rem",
    background: "#E955BF",
    color: "#fff",
    border: "none",
    outline: "none",
    borderRadius: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "4.5rem",
    cursor: "pointer"
}

export default TweetsForm
