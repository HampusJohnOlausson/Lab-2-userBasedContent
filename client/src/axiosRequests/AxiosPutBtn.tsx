import axios from 'axios';
import React, { useState } from 'react'
import { CSSProperties } from 'react';
import { TweetObject } from "../Components/Tweets";
import CreateIcon from '@material-ui/icons/Create';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

interface Props {
    value: TweetObject
}

function AxiosPutBtn(props: Props) {
    const [showInput, setShowInput] = useState(true);
    const [updateValue, setUpdateValue] = useState("");

    function showInputField() {
        setShowInput(false);
    };

    const closeInputField = () => {
        setShowInput(true);
    };

    const setInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateValue(e.target.value);
    };

    const makePutRequest = async () => {
        const id = props.value._id;
        await axios.put(`/api/posts/${id}`, { tweet: updateValue });
        closeInputField();
    };

    return (    
        <>
        <CreateIcon style={iconStyle} onClick={showInputField}/>
            {!showInput && (
                <div style={updateFieldStyle}>
                    <input 
                        type="text" 
                        placeholder="Update text..."
                        style={inputStyle}
                        onChange={(e) => setInputValue(e)}
                    />
                    <ClearIcon 
                        style={inputIcons} 
                        onClick={closeInputField}
                    />
                    <DoneIcon 
                        style={inputIcons} 
                        onClick={makePutRequest}
                    />
                </div>
            )}
        </> 
    );
}

const iconStyle: CSSProperties = {
    cursor: "pointer",
    color: "#DA2CA9",
    marginRight: "0.5rem"
}

const updateFieldStyle: CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
}

const inputStyle: CSSProperties = {
    fontSize: "1rem",
    width: "80%"
}

const inputIcons: CSSProperties = {
    color: "#DA2CA9", 
    cursor: "pointer"
}

export default AxiosPutBtn
