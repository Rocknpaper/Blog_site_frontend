import React, { MutableRefObject, useEffect, useRef } from "react";
import "./Sidebar.css";
import BlogLogo from "./blog-solid.svg";

import Home from "@material-ui/icons/HomeOutlined";
import PostAdd from "@material-ui/icons/PostAdd";
import SidebarOptions from "./SidebarOption/SidebarOption";
import ShowPost from "@material-ui/icons/LibraryBooksOutlined";
import User from "@material-ui/icons/PermIdentityOutlined";
import Logout from "@material-ui/icons/MeetingRoomOutlined";
import Explore from "@material-ui/icons/ExploreOutlined";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReducersType, UserState } from "../../models";
import { TweenLite } from "gsap";

const Sidebar: React.FC = () => {
  const user = useSelector<ReducersType, UserState>((state) => state.user);
  let sidebar: any = useRef(null);
  let brand: any = useRef(null);
  useEffect(() => {
    TweenLite.from(sidebar, 0.8, {
      x: -400,
    });
    TweenLite.from(brand, 0.8, {
      transform: "rotateX(180deg)",
      opacity: 0,
      delay: 0.8,
    });
  }, []);

  return (
    <nav ref={(el) => (sidebar = el)} className="sideBar">
      <NavLink to="/" exact className="logo">
        <img src={BlogLogo} alt="Logo" />
        <h1 ref={(el) => (brand = el)}>Blogger</h1>
      </NavLink>
      <div className="nav-elements">
        <SidebarOptions path="/" exact text="Home" Icon={Home}></SidebarOptions>
        <SidebarOptions
          path="/explore"
          text="Explore"
          Icon={Explore}
        ></SidebarOptions>
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
        {user.logged ? (
          <SidebarOptions
            path="/logout"
            text="Log out"
            Icon={Logout}
          ></SidebarOptions>
        ) : null}
      </div>
    </nav>
  );
};

export default Sidebar;
