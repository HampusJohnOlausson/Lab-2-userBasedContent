import React from 'react'
import { CSSProperties } from 'react';

interface Props {}

function UserTweets() {
    return (
        <div style={rootStyle}>
            <h2>Name</h2>
            <p style={textStyle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, accusantium.</p>
        </div>
    );
}

const rootStyle: CSSProperties = {
    background: "#EDEDED",
    borderRadius: "0.4rem",
    width: "30rem",
    padding: "1rem",
    margin: "2rem 0rem"
}

const textStyle: CSSProperties = {
    fontWeight: "bold",
    color: "#333"
}


export default UserTweets