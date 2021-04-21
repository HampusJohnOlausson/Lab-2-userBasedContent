import React, { Component } from 'react'
import axios from 'axios';
import "./Tweet.css";
import { response } from 'express';

export default class Tweets extends Component {
  
    state = {
        name:'',
        tweet: '',
        posts: [],
        createdAt: '',
        tweetId: '',
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

    deleteTweet = (id: any) => {
        axios('api/posts/' + id, {
            method: 'DELETE'
        }).then((response) => {
                console.log('deleted')
            }).catch((err) => {
                console.log(err);
            })
    }

    handleClick = () => {
        this.deleteTweet("608041a24f09358ebf57e09d");

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
                <button className="editBtn">Edit</button>
                <button onClick={this.handleClick} className="deleteBtn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
