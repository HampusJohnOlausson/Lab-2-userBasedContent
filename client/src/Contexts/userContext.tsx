import React, { Component, createContext } from "react";
import axios from "axios";

interface TweetObject {
  name: string;
  tweet: string;
  updatedAt: string;
  _id: string;
}

interface State {
  posts: TweetObject[];
  allPosts: TweetObject[];
}

interface ContextProps extends State {
  fetchTweets: () => void;
  fetchAllTweets: () => void;
}

export const UserContext = createContext<ContextProps>({
  posts: [],
  allPosts: [],
  fetchTweets: () => {},
  fetchAllTweets: () => {},
});

class UserProvider extends Component<{}, State> {
  state: State = {
    posts: [],
    allPosts: [],
  };

  fetchUserTweets = async () => {
    const request = await axios.get("/api/posts/user/tweets");
    this.setState({ posts: request.data });
    return request;
  };

  fetchAllTweetsApi = async () => {
    const request = await axios.get("/api/posts/");
    this.setState({ allPosts: request.data });
    return request;
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          fetchTweets: this.fetchUserTweets,
          fetchAllTweets: this.fetchAllTweetsApi,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
