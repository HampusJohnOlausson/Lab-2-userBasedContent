import React, { Component} from 'react'
import axios from 'axios';
import "./style/Tweet.css";
import { ObjectId } from 'bson';

interface State {
  posts: object[];
  editAble: Boolean;
  tweet: String;
  role: string;
}
export default class Tweets extends Component<{}, State> {
  state = {
    posts: [],
    editAble: true,
    tweet: "",
    role: ""
  };

  componentDidMount = () => {
    this.getTweets();
    this.getUserRole()
  };

  async getUserRole() {
    try {
      const response = await axios.get('/api/users/loggedIn/role')
      const result = response.data
      this.setState({ role: result })
    } catch (error) {
      
    }
  }

  getTweets = () => {
    axios
      .get("/api/posts")
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteTweet = (id: ObjectId) => {
    axios
      .delete("api/posts/" + id)
      .then((response) => {
        this.getTweets();
        console.log("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  openModal() {
    this.setState({ editAble: !this.state.editAble });
    console.log(this.state.editAble);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    this.setState({ tweet: newValue });
    console.log(newValue);
  };

  updateTweet = (id: ObjectId) => {
    axios
      .put("/api/posts/" + id, {
        tweet: this.state.tweet
      })
      .then((response) => {
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="tweetWrapper">
        <h1 className="titlePage">Tweets</h1>
        <div className="tweetSection">
          {this.state.posts.map((post: any) => (
            <div className="tweetContainer" key={post._id}>
              <h3 className="userName">{post.name}</h3>
              <h5 className="tweetParagraph">{post.tweet}</h5>
              <span className="timeAndDate">{post.createdAt}</span>
              {this.state.role === 'admin'?
                <div className="lowerSection">
                  <button className="editBtn" onClick={this.openModal.bind(this)}>
                    Edit
                  </button>
                  <button
                    onClick={() => this.deleteTweet(post._id)}
                    className="deleteBtn"
                  >
                    Delete
                  </button>
                </div>
              : 
                <>
                </>  
              }
              {!this.state.editAble && (
                <div className="editContainer">
                  <form>
                    <input
                      className="input"
                      type="text"
                      defaultValue={post.tweet}
                      onChange={this.handleChange}
                    />
                    <button
                      className="updateBtn"
                      type="submit"
                      onClick={() => this.updateTweet(post._id)}
                    >
                      Update
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}


