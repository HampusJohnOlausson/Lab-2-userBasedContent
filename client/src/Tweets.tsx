import React, { Component } from 'react'
import axios from 'axios';

export default class Tweets extends Component {
  
    state = {
        name:'',
        tweet: '',
        posts: [],
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
      <div>
        <h1>Tweets</h1>
        <div>
          {this.state.posts.map((post: any, index: any) => (
            <div key={index}>
              <h3>{post.name}</h3>
              <h5>{post.tweet}</h5>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
