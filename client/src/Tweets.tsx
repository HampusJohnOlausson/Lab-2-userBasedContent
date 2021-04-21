import React, { Component } from 'react'
import axios from 'axios';
import "./Tweet.css";

export default class Tweets extends Component {
  
    state = {
        name:'',
        tweet: '',
        posts: [],
        createdAt: '',
    }

    componentDidMount = () => {
        this.getPosts();
    };

    getPosts = () => {
        axios.get('/api/posts')
            .then((response) => {
                const data = response.data;
                this.setState({ posts: data })
                console.log(data);
            }).catch((err) => {
                console.log(err);
            })
    }



  render() {
    return (
      <div className="tweetWrapper">
        <h1 className="titlePage">Tweets</h1>
        <div className="tweetSection">
          {this.state.posts.map((post: any, index: any) => (
            <div className="tweetContainer" key={index}>
              <h3 className="userName">{post.name}</h3>
              <h5 className="tweetParagraph">{post.tweet}</h5>
              <span className="timeAndDate">{post.createdAt}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
