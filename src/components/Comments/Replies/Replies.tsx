import React from "react";
import "./Replies.css";

import { Reply } from "../../../models";
import Replys from "./Reply/Reply";

interface PropsType {
  replies: Reply[];
  comment_id: string;
}

const Replies: React.FC<PropsType> = ({ replies, comment_id }) => {
  const rep = replies.map((reply) => (
    <Replys reply={reply} comment_id={comment_id} />
  ));
  return <React.Fragment>{rep}</React.Fragment>;
};

export default Replies;
