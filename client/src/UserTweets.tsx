import React from 'react'
import { CSSProperties } from 'react';
import { TweetObject } from "./TweetWrapper"

interface Props {
    value: TweetObject
}

function UserTweets(props: Props) {    
    return (
        <div style={rootStyle}>
            <h3>@{props.value.name}</h3>
            <p style={tweetStyle}>{props.value.tweet}</p>
            <p style={dateStyle}>{props.value.updatedAt}</p>
        </div>
    );
}

const rootStyle: CSSProperties = {
    background: "#fff",
    borderRadius: "1rem",
    border: "2px solid #DA2CA9",
    width: "30rem",
    padding: "1rem",
    margin: "2rem 0rem",
}

const tweetStyle: CSSProperties = {
    color: "#333",
    fontSize: "1.5rem"
}

const dateStyle: CSSProperties = {
    fontSize: "0.9rem",
    color: "grey"
}


export default UserTweets