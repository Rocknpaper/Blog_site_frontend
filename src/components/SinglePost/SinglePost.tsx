import React, { useEffect, useRef } from "react";
import "./SinglePost.css";

import PostVotes from "./PostVotes/PostVotes";
import Post from "./Post/Post";

import { TweenLite } from "gsap";

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
  onAuthorClick?: () => void;
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
  onAuthorClick,
  up,
  down,
}) => {
  let singlePost: any = useRef(null);

  useEffect(() => {
    TweenLite.from(singlePost, 0.5, {
      delay: 0.2,
      scale: 0.3,
    });
  }, []);

  return (
    <div
      ref={(el) => (singlePost = el)}
      className="singlePost"
      onClick={onClick}
    >
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
        authorOnClick={onAuthorClick}
      />
    </div>
  );
};

export default SinglePost;
