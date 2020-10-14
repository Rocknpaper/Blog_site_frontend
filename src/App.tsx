import React from "react";
import { Route } from "react-router-dom";
import "./App.css";

import Sidebar from "./components/Navigation/Sidebar";
import Feed from "./containers/Feed/Feed";
import CreatePost from "./components/CreatePost/CreatePost";
import ShowPosts from "./containers/ShowPosts/ShowPosts";
import UserDetails from "./containers/UserDetails/UserDetails";
import Auth from "./containers/Auth/Auth";
import Registration from "./containers/Registration/Registration";
import Logout from "./containers/Auth/Logout/Logout";

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <Route path="/" exact component={Feed} />
      <Route path="/create-post" component={CreatePost} />
      <Route path="/show-posts" component={ShowPosts} />
      <Route path="/user" component={UserDetails} />
      <Route path="/auth" component={Auth} />
      <Route path="/register" component={Registration} />
      <Route path="/edit-post/:id" component={CreatePost} />
      <Route path="/logout" component={Logout} />
    </div>
  );
};

export default App;
