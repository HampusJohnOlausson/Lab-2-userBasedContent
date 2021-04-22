import React, { Component } from 'react'
import axios from 'axios';
import "./Tweet.css";



export default class Tweets extends Component {
  state = {
    posts: [],
    editAble: true,
    tweet: '',
  };

  componentDidMount = () => {
    this.getPosts();
  };

  getPosts = () => {
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

  deleteTweet = (id: any) => {
    axios
      .delete("api/posts/" + id)
      .then((response) => {
        this.getPosts();
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

  updateTweet = () => {

  }

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
              {!this.state.editAble && (
                <div className="editContainer">
                  <form >
                    <input type="text" defaultValue={post.tweet}  />
                    <button type="submit">Update</button>
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


