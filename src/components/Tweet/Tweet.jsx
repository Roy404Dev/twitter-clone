import React, { useContext, useRef, useState } from "react";
import DataContext from "../../context/DataContext";
import { MdVerified, MdIosShare } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiDotsHorizontalRounded, BiBarChart } from "react-icons/bi";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "../Modal";
const Tweet = ({ tweet }) => {
  const { handleLike, handleRetweet, deleteTweet, handleShowComment } =
    useContext(DataContext);
  const { id, user, text, image, timestamp, comments, retweets, likes, views } =
    tweet;
  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const f = Intl.DateTimeFormat("en-us", {
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  return (
    <>
      <Link
        to={`/${user.name}/status/${id}`}
        style={{ textDecoration: "none" }}
      >
        <div className="tweet" key={id} id={id}>
          {showModal && (
            <div
              className="modalClickArea"
              onClick={(e) => {
                setShowModal(!showModal);
                e.preventDefault();
              }}
            ></div>
          )}
          <div className="tweet__wrapper">
            <div className="tweet__Header">
              <div className="tweet__headerRow">
                <div className="tweet__profileMain">
                  <div className="tweet__profile">
                    <img
                      src={user.profileImg}
                      alt="profile image"
                      className="tweet__profileImage"
                    />
                  </div>
                  <div className="tweet__content">
                    <div className="tweet__headerMain">
                      <div className="userInfo row">
                        <span className="tweet__name">{user.name}</span>
                        {user.verified && <MdVerified color="#FFD700" />}
                        <span className="tweet__username">{user.username}</span>
                        <span className="tweet__timestamp--circle">●</span>
                        <span className="tweet__timestamp">
                          {f.format(timestamp)}
                        </span>
                      </div>
                    </div>
                    <div className="tweet__primaryHeading">
                      <span style={{ color: "white" }}>{text}</span>
                      <img src={image} alt="" className="tweetImage" />
                    </div>
                  </div>
                </div>
                <div className="tweet__ellipsisMenu">
                  <button
                    className="ellipsisMenuBtn"
                    onClick={(e) => {
                      setShowModal(!showModal);
                      e.preventDefault();
                    }}
                  >
                    <BiDotsHorizontalRounded size={20} className="ellipsisIcon"/>
                  </button>
                  {showModal && (
                    <>
                      <Modal deleteTweet={deleteTweet} id={id} />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="tweet__bottom">
              <div
                className="tweet__comments tweet__BottomItem"
                onClick={(e) => handleShowComment(e, id)}
              >
                <button className="commentsBtn">
                  <FaRegComment className="icon" />
                </button>
                <span className="commentCount">{comments.length}</span>
              </div>
              <div
                className="tweet__retweets tweet__BottomItem"
                onClick={(e) => handleRetweet(e, id)}
              >
                <button className="retweetBtn">
                  <FaRetweet className="icon" />
                </button>
                <span className="retweetsCount">{retweets.length}</span>
              </div>
              <div
                className="tweet__likes tweet__BottomItem"
                onClick={(e) => handleLike(e, id, setLiked, liked)}
              >
                <button className="likeBtn">
                  {liked ? (
                    <AiFillHeart color="#F91880" />
                  ) : (
                    <AiOutlineHeart className="icon" />
                  )}
                </button>
                <span className="likesCount">{likes.length}</span>
              </div>
              <div className="tweet__views tweet__BottomItem">
                <button className="viewsBtn">
                  <BiBarChart className="icon" />
                </button>
                <span className="viewsCount">{views}</span>
              </div>
              <div className="tweet__share tweet__BottomItem">
                <button className="shareBtn">
                  <MdIosShare className="icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Tweet;
