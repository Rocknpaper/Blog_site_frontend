import { ActionTypes } from "../store/actions/actionTypes";

interface Votes {
  users: { $oid: string }[];
  count: number;
}

export interface InputType {
  elementConfig: {
    value: string;
    type: string;
    placeHolder: string;
  };
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    isEmail?: boolean;
  };
  edit?: boolean;
  isValid: boolean;
}

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
  upvotes: Votes;
  downvotes: Votes;
};

export interface ReducersType {
  user: UserState;
  blog: BlogState;
}

export interface Reply {
  _id: {
    $oid: string;
  };
  user_id: {
    $oid: string;
  };
  created_at: {
    $date: Date;
  };
  username: string;
  content: string;
  likes: Votes;
  dislikes: Votes;
}

export interface CommentType {
  _id: {
    $oid: string;
  };
  user_id: {
    $oid: string;
  };
  blog_id: {
    $oid: string;
  };
  created_at: {
    $date: Date;
  };
  content: string;
  username: string;
  replies: Reply[];
  likes: Votes;
  dislikes: Votes;
}

export interface BlogState {
  blogs: Blogs[];
  user: UserDetails;
  comments: CommentType[];
  replyTo: CommentType;
  reply: boolean;
  edit: boolean;
}

export interface UserDetails {
  _id: { $oid: string };
  username: string;
  email: string;
  user_avatar: string;
}

export interface UserState {
  _id: { $oid: string };
  logged: boolean;
  jwt: string;
  redirect_url: string;
  username: string;
  email: string;
  user_avatar: string;
  error?: {
    error_type: number;
    cause?: string;
    email: string;
    password: string;
  };
}

export interface Action {
  type: ActionTypes;
  blogs: Array<Blogs>;
}

export interface VoteAction {
  type: ActionTypes;
  blog_id: string;
  user_id: string;
}
