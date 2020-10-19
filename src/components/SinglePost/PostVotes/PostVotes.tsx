import React from "react";
import "./PostVotes.css";

import UpVote from "@material-ui/icons/ArrowUpwardOutlined";
import DownVote from "@material-ui/icons/ArrowDownwardOutlined";

interface PropsType {
  upVoteClick?: (e: any) => void;
  downVoteClick?: (e: any) => void;
  upVote: number;
  downVote: number;
  up?: boolean;
  down?: boolean;
}

const PostVotes: React.FC<PropsType> = ({
  upVoteClick,
  downVoteClick,
  upVote,
  downVote,
  up,
  down,
}) => {
  const up_classes = ["upvote"];
  const down_classes = ["downvote"];

  if (up) {
    up_classes.push("active");
  }

  if (down) {
    down_classes.push("active");
  }

  return (
    <div className="post__votes">
      <div
        className={up_classes.join(" ")}
        onClick={(e: any) => {
          if (upVoteClick) upVoteClick(e);
        }}
      >
        <UpVote />
      </div>
      <p>{upVote}</p>
      <div
        className={down_classes.join(" ")}
        onClick={(e: any) => {
          if (downVoteClick) downVoteClick(e);
        }}
      >
        <DownVote />
      </div>
      <p>{downVote}</p>
    </div>
  );
};

export default PostVotes;
