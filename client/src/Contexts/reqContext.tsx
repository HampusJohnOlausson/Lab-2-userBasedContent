import React, { Component, createContext } from "react";
import axios from 'axios';

interface TweetObject {
    name: string, 
    tweet: string,  
    _id: string, 
    date: string
}

interface State {
  posts: TweetObject[],
  allPosts: TweetObject[] 
}

interface ContextProps extends State {
  fetchTweets: () => void;
  fetchAllTweets: () => void;
}

export const AxiosContext = createContext<ContextProps>({
  posts: [],
  allPosts: [], 
  fetchTweets: () => {}, 
  fetchAllTweets: () => {}
});

class AxiosProvider extends Component<{}, State> {
  state: State = {
    posts: [],
    allPosts: []
  };

  fetchUserTweets = async () => {
    const request = await axios.get("/api/posts/user/tweets");
    this.setState({ posts: request.data })
    return request
  }

  fetchAllTweetsApi = async () => {
    const request = await axios.get("/api/posts/");
    this.setState({ allPosts: request.data })
    return request
  }

  render() {
    return (
      <AxiosContext.Provider
        value={{
          ...this.state,
          fetchTweets: this.fetchUserTweets, 
          fetchAllTweets: this.fetchAllTweetsApi
        }}
      >
        {this.props.children}
      </AxiosContext.Provider>
    );
  }
}

export default AxiosProvider;
