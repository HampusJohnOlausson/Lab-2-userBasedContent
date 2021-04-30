import axios from 'axios';
import { TweetObject } from '../Components/Tweets';
import ClearIcon from '@material-ui/icons/Clear';
import { CSSProperties } from 'react';

interface Props {
    value: TweetObject
}

function AxiosDltBtn(props: Props) {

    const deleteTweet = async () => {
        const id = props.value._id;
        const request = await axios.delete(`/api/posts/${id}`);
    }

    return (
        <ClearIcon style={iconStyle} onClick={deleteTweet} />
    )
}

const iconStyle: CSSProperties = {
    cursor: "pointer",
    color: "#DA2CA9",
    fontSize: "1.8rem"
}

export default AxiosDltBtn
