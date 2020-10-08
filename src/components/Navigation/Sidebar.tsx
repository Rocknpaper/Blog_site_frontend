import React from "react";
import "./Sidebar.css";
import BlogLogo from "./blog-solid.svg";

import Home from "@material-ui/icons/HomeOutlined";
import PostAdd from "@material-ui/icons/PostAdd";
import SidebarOptions from "./SidebarOption/SidebarOption";
import ShowPost from "@material-ui/icons/LibraryBooksOutlined";
import User from "@material-ui/icons/PermIdentityOutlined";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <nav className="sideBar">
      <NavLink to="/" exact className="logo">
        <img src={BlogLogo} alt="Logo" />
        <h1>Blogger</h1>
      </NavLink>
      <div className="nav-elements">
        <SidebarOptions path="/" exact text="Home" Icon={Home}></SidebarOptions>
        <SidebarOptions
          path="/create-post"
          text="Create Post"
          Icon={PostAdd}
        ></SidebarOptions>
        <SidebarOptions
          path="/show-posts"
          text="Show all Posts"
          Icon={ShowPost}
        ></SidebarOptions>
        <SidebarOptions
          path="/auth"
          text="User Details"
          Icon={User}
        ></SidebarOptions>
      </div>
    </nav>
  );
};

export default Sidebar;
