import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Sidebar from "./components/Navigation/Sidebar";
import Feed from "./components/Feed/Feed";
import CreatePost from "./components/CreatePost/CreatePost";
import ShowPosts from "./components/ShowPosts/ShowPosts";
import UserDetails from "./components/UserDetails/UserDetails";
import Auth from "./containers/Auth/Auth";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Sidebar />
        <Route path="/" exact component={Feed} />
        <Route path="/create-post" component={CreatePost} />
        <Route path="/show-posts" component={ShowPosts} />
        <Route path="/user" component={UserDetails} />
        <Route path="/auth" component={Auth} />
      </Router>
    </div>
  );
};

export default App;
