import React, { CSSProperties } from 'react'

function CreateTweet() {
    return (
        <form action="/" style={formStyle}>
            <h2 style={titleStyle}>Send a tweet</h2>
            <div style={inputsHolder}>
                <input style={inputStyle} type="text" placeholder="What's on your mind..."/>
                <input style={btnStyle} type="submit" value="+"/>
            </div>
        </form>
    );
}

const formStyle: CSSProperties = {
    width: "25rem",
    height: "15rem",
    padding: "1rem"
}

const titleStyle: CSSProperties = {
    color: "#E955BF",
    fontSize: "2rem",
    justifySelf: "flex-start"
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

export default CreateTweet
