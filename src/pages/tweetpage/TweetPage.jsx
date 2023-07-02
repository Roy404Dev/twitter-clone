import React, { useContext } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import DataContext from "../../context/DataContext";
import { Link, useParams } from "react-router-dom";
import FullTweet from "../../components/FullTweet/FullTweet";
const TweetPage = () => {
  const { tweets } = useContext(DataContext);
  const { id } = useParams();
  const tweet = tweets.filter((tweet) => tweet.id !== id);
  return (
    <div className="tweetPage">
      <div className="tweetPage__header">
        <Link to="/home">
          <button className="back-arrow-button">
            <AiOutlineArrowLeft size={20} />
          </button>
        </Link>
        <span>Tweet</span>
      </div>
      <FullTweet tweet={tweet[0]} />
    </div>
  );
};

export default TweetPage;
