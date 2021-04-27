import React, { Component, createContext } from "react";
import axios from 'axios';

interface TweetObject {
    name: string, 
    tweet: string, 
    updatedAt: string, 
    _id: string 
}

interface State {
  posts: TweetObject[] 
}

interface ContextProps extends State {
  fetchTweets: () => void;
}

export const AxiosContext = createContext<ContextProps>({
  posts: [], 
  fetchTweets: () => {}
});

class AxiosProvider extends Component<{}, State> {
  state: State = {
    posts: [],
  };

  fetchUserTweets = async () => {
    const request = await axios.get("/api/posts/user/tweets");
    this.setState({ posts: request.data })
    return request
  }

  render() {
    return (
      <AxiosContext.Provider
        value={{
          ...this.state,
          fetchTweets: this.fetchUserTweets, 
        }}
      >
        {this.props.children}
      </AxiosContext.Provider>
    );
  }
}

export default AxiosProvider;
