import React, {useEffect} from "react";
import "./Feed.css";
import {useDispatch, useSelector} from "react-redux";

import QuickPost from "./QuickPost/QuickPost";
import SinglePost from "../../components/SinglePost/SinglePost";
import {Blogs, ReducersType, UserState} from "../../models";
import * as actions from "../../store/actions/blog_actions";


const Feed: React.FC = () => {
        const blogs = useSelector < ReducersType,
        Array < Blogs >> (state => state.blog.blogs);
        const user = useSelector<ReducersType, UserState>(state => state.user, (curr, prev) => curr.logged === prev.logged);
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(actions.initBlogs());
        }, []);


        const res = blogs.length<= 0 ? "No Posts Found" :  blogs.map(data => < SinglePost
        key = {
            data._id?.$oid
        }
        title = {
            data.title
        }
        author = {
            data.username ? data.username:""
        }
        date = {
            data.created_at?.$date
        } 
        upVote= {
            data.upvotes.count
        }
        downVote = {
            data.downvotes.count
        }

        onUpvoteClick = {() => dispatch(actions.upVoteAsync(data._id ? data._id.$oid : ""))}

        onDownvoteClick = {() => dispatch(actions.downVoteAsync(data._id ? data._id.$oid : ""))}

        > </SinglePost>
    );

    return(<div className = "feed" > 
    {user.logged ? <QuickPost /> : null}
    <div className = "feed__posts" > {
        res
    } </div>
    </div >);
};

export default React.memo(Feed);
