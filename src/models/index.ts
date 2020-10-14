import { ActionTypes } from "../store/actions/actionTypes";

export type Blogs = {
  _id?: {
    $oid: string;
  };
  title: string;
  content: string;
  user_id?: string;
  username?: string;
  created_at?: {
    $date: Date;
  };
  upvotes: {
    users: any[];
    count: number;
  };
  downvotes: {
    users: any[];
    count: number;
  };
};

export interface ReducersType {
  user: UserState;
  blog: BlogState;
}

export interface BlogState {
  blogs: Blogs[];
}

export interface UserState {
  _id: { $oid: string };
  logged: boolean;
  jwt: string;
  redirect_url: string;
  username: string;
  email: string;
  user_avatar: string;
}

export interface Action {
  type: ActionTypes;
  blogs: Array<Blogs>;
}

export interface VoteAction {
  type: ActionTypes;
  blog_id: string;
}
