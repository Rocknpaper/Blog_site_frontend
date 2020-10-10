import { Blogs } from "../models";
import { ActionTypes } from "./actionTypes";
import axios from "../axios";

const addBlogPosts = (blogs:Array<Blogs>) => {
    console.log(blogs)
    return {
        type: ActionTypes.ADD_POSTS,
        blogs: blogs
    }
}


export const initBlogs = () => {
    return (dispatch: any) => {
        const jwt = localStorage.getItem("jwt");
            axios.get<Blogs[]>("/blogs", {
                headers: {
                Authorization: `Bearer ${jwt}` 
            }
        })
        .then(data => {
            console.log(data.data)
            dispatch(addBlogPosts(data.data))})
        .catch(e=> console.log(e))
    }
}