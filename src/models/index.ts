import { ActionTypes } from "../store/actionTypes";

export type Blogs = {
    _id: {
        $oid: string
    };
    title: string;
    content: string;
    user_id: string;
}

export interface BlogState {
    blogs: Blogs[];
}

export interface Action {
    type: ActionTypes,
    blogs:Array<Blogs>
}