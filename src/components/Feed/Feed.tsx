import React, { useEffect, useState } from "react";
import "./Feed.css";
import axios from "../../axios";

import QuickPost from "./QuickPost/QuickPost";
import SinglePost from "../UI/SinglePost/SinglePost";

const Feed = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    axios
      .get("/blogs", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((data) => {
        setBlogs(data.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="feed">
      <QuickPost />
      <div className="feed__posts">
        {blogs.map((data) => (
          <SinglePost
            key={data._id.$oid}
            title={data.title}
            author={data.user_id}
            date={new Date()}
          ></SinglePost>
        ))}
      </div>
    </div>
  );
};

export default Feed;
