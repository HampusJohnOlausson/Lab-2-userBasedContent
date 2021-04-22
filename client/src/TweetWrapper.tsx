import React from 'react';
import { CSSProperties } from 'react';
import TweetsForm from './TweetsForm';
import UserTweets from './UserTweets';

function TweetWrapper() {

    return (
        <div style={rootStyle}>
            <TweetsForm/>
            <div>
                <h2 style={titleStyle}>My recent tweets</h2>
                <UserTweets/>
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