import React, { useContext, useRef, useState } from "react";
import DataContext from "../../context/DataContext";
import Tweet from "../Tweet/Tweet";
import CommentInput from "../Comment/CommentInput";

const Tweets = () => {
  const { tweets, showCommentInput, commentId } = useContext(DataContext);
  const renderedTweets = tweets.map((tweet) => {
    return <Tweet tweet={tweet} key={tweet.id} />;
  });
  return (
    <>
      {showCommentInput && <CommentInput id={commentId} />}
      <div className="feed">{tweets && renderedTweets}</div>
    </>
  );
};

export default Tweets;
