import React, {useEffect} from "react";
import "./Feed.css";
import {useDispatch, useSelector} from "react-redux";

import QuickPost from "./QuickPost/QuickPost";
import SinglePost from "../UI/SinglePost/SinglePost";
import {Blogs, BlogState} from "../../models";
import * as actions from "../../store/actions";


const Feed: React.FC = () => {
        const blogs = useSelector < BlogState,
        Array < Blogs >> (state => state.blogs);
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(actions.initBlogs());
        }, []);

        console.log(blogs)


        const res = blogs.length<= 0 ? "No Posts Found" :  blogs.map(data => < SinglePost
        key = {
            data._id.$oid
        }
        title = {
            data.title
        }
        author = {
            data.user_id
        }
        date = {
            new Date()
        } > </SinglePost>
    );

    return(<div className = "feed" > <QuickPost /> < div className = "feed__posts" > {
        res
    } </div>
    </div >);
};

export default React.memo(Feed);
