import { Component} from 'react'
import axios from 'axios';
import "./style/Tweet.css";
import { AxiosContext } from './Contexts/reqContext';
import AxiosPutBtn from './axiosRequests/AxiosPutBtn';
import AxiosDltBtn from './axiosRequests/AxiosDltBtn';
import { TweetObject } from './TweetWrapper';

interface State {
  posts: Object[];
  editAble: Boolean;
  tweet: String;
  role: string;
  userName: string;
}
export default class Tweets extends Component<{}, State> {
  static contextType = AxiosContext

  state = {
    posts: [],
    editAble: true,
    tweet: "",
    role: "",
    userName: "",
  };

  componentDidMount = () => {
    this.getUserRole();
    this.fetchUserName();
    this.context.fetchAllTweets();
  };

  componentDidUpdate = () => {
    this.context.fetchAllTweets();
  };

  async getUserRole() {
    try {
      const response = await axios.get('/api/users/loggedIn/role')
      const result = response.data
      this.setState({ role: result })
    } catch (error) {
      
    }
  }

  async fetchUserName() {
    try {
      const response = await axios.get('/api/users/loggedIn')
      const result = response.data
      this.setState({ userName: result });
      console.log(this.state.userName)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div className="tweetWrapper">
        <h1 className="titlePage">Tweets</h1>
        <div className="tweetSection">
          {this.context.allPosts.map((post: TweetObject) => (
            <div className="tweetContainer" key={post._id}>
              <h3 className="userName">@{post.name}</h3>
              <h5 className="tweetParagraph">{post.tweet}</h5>
              <span className="timeAndDate">{post.updatedAt}</span>
              {this.state.role === 'admin' || post.name === this.state.userName ?
                <div className="lowerSection">
                  <AxiosDltBtn value={post}/>
                  <AxiosPutBtn value={post}/>
                </div>
              : 
                <></>  
              }
            </div>
          ))}
        </div>
      </div>
    );
  }
}