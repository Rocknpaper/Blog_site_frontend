import React, { useEffect, useRef } from "react";
import Button from "../../../components/UI/Button/Button";
import "./QuickPost.css";

import { TweenLite } from "gsap";

interface PropsType {
  onClick?: () => void;
}

const QuickPost: React.FC<PropsType> = ({ onClick }) => {
  let qck: any = useRef(null);

  useEffect(() => {
    TweenLite.to(qck, 0.8, {
      transform: "translateY(0)",
    });
  });

  return (
    <div ref={(el) => (qck = el)} className="quickPost">
      <h2>Share Your Thoughts</h2>
      <h1>Write a post</h1>
      <Button text="Post" onClick={onClick} />
    </div>
  );
};

export default QuickPost;
