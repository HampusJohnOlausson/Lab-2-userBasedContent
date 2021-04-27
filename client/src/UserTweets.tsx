import React from 'react';
import { CSSProperties } from 'react';
import AxiosDltBtn from './axiosRequests/AxiosDltBtn';
import AxiosPutBtn from './axiosRequests/AxiosPutBtn';
import { TweetObject } from "./TweetWrapper";

interface Props {
    value: TweetObject
}

function UserTweets(props: Props) {
    return (
        <div style={rootStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3>@{props.value.name}</h3>
                <AxiosDltBtn value={props.value}/>
            </div>
            <p style={tweetStyle}>{props.value.tweet}</p>
            <p style={dateStyle}>{props.value.updatedAt}</p>
            <div style={btnHolder}>
                <AxiosPutBtn value={props.value}/>
            </div>
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

const btnHolder: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
}


export default UserTweets