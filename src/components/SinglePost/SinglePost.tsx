import React from "react";
import "./SinglePost.css";

import PostVotes from "./PostVotes/PostVotes";
import Post from "./Post/Post";

interface PropsType {
  title: String;
  author: String;
  date?: Date;
  editable?: true;
  onEditClick?: (e: any) => void;
  onDeleteClick?: (e: any) => void;
  upVote: number;
  downVote: number;
  onUpvoteClick?: (e: any) => void;
  onDownvoteClick?: (e: any) => void;
  onClick: () => void;
  up?: boolean;
  down?: boolean;
}

const SinglePost: React.FC<PropsType> = ({
  title,
  author,
  date,
  upVote,
  downVote,
  editable,
  onDownvoteClick,
  onUpvoteClick,
  onEditClick,
  onDeleteClick,
  onClick,
  up,
  down,
}) => {
  return (
    <div className="singlePost" onClick={onClick}>
      <PostVotes
        upVote={upVote}
        downVote={downVote}
        upVoteClick={onUpvoteClick}
        downVoteClick={onDownvoteClick}
        up={up}
        down={down}
      />
      <Post
        title={title}
        author={author}
        date={date}
        editable={editable}
        onDeleteClick={onDeleteClick}
        onEditClick={onEditClick}
      />
    </div>
  );
};

export default SinglePost;
