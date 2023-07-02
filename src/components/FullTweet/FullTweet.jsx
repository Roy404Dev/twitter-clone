import React, { useContext, useEffect, useRef, useState } from "react";
import DataContext from "../../context/DataContext";
import { MdVerified, MdIosShare } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiDotsHorizontalRounded, BiBarChart } from "react-icons/bi";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./FullTweet.scss";
import Modal from "../Modal";
import { RxImage } from "react-icons/rx";
const FullTweet = ({ tweet }) => {
  const {
    handleLike,
    handleRetweet,
    deleteTweet,
    handleShowComment,
    replyText,
    setReplyText,
    currentUser,
    setReplyImage,
    replyImage,
    handleReplySumit,
  } = useContext(DataContext);
  const {
    id,
    user,
    text,
    image,
    timestamp,
    comments,
    retweets,
    likes,
    views,
    quotes,
    bookmarks,
  } = tweet;
  const [liked, setLiked] = useState(false);
  const [bookmark, setBookmark] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const f = Intl.DateTimeFormat("en-us", {
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const textAreaRef = useRef(null);

  useEffect(() => {
    //grow textarea
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "60px";
      const taHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = taHeight + "px";
    }
  }, [replyText]);

  return (
    <div className="FullTweet" key={id} id={id}>
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
              <div className="tweet__headerMain">
                <div className="userInfo col">
                  <span className="tweet__name">{user.name}</span>
                  {user.verified && <MdVerified color="#FFD700" />}
                  <span className="tweet__username">{user.username}</span>
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
                <BiDotsHorizontalRounded size={20} className="ellipsisIcon" />
              </button>
              {showModal && (
                <>
                  <Modal deleteTweet={deleteTweet} id={id} />
                </>
              )}
            </div>
          </div>
          <div className="tweet__content">
            <div className="tweet__primaryHeading">
              <span className="text">{text}</span>
              <img src={image} alt="" className="tweetImage" />
            </div>
          </div>
        </div>
        <div className="tweet__stats">
          <div className="retweets">
            <span className="stat-count">{retweets.length}</span>
            <span className="stat-name">Retweets</span>
          </div>
          <div className="quotes">
            <span className="stat-count">{quotes}</span>
            <span className="stat-name">Quotes</span>
          </div>
          <div className="likes">
            <span className="stat-count">{likes.length}</span>
            <span className="stat-name">Likes</span>
          </div>
          <div className="bookmarks">
            <span className="stat-count">{bookmarks}</span>
            <span className="stat-name">Bookmarks</span>
          </div>
        </div>
        <div className="tweet__bottom">
          <div
            className="tweet__comments tweet__BottomItem"
            onClick={(e) => handleShowComment(e, id)}
          >
            <button className="commentsBtn">
              <FaRegComment className="icon" size={22.5} />
            </button>
          </div>
          <div
            className="tweet__retweets tweet__BottomItem"
            onClick={(e) => handleRetweet(e, id)}
          >
            <button className="retweetBtn">
              <FaRetweet className="icon" size={22.5} />
            </button>
          </div>
          <div
            className="tweet__likes tweet__BottomItem"
            onClick={(e) => handleLike(e, id, setLiked, liked)}
          >
            <button className="likeBtn">
              {liked ? (
                <AiFillHeart color="#F91880" size={22.5} />
              ) : (
                <AiOutlineHeart className="icon" size={22.5} />
              )}
            </button>
          </div>
          <div className="tweet__bookmark tweet__BottomItem">
            <button>
              <FiBookmark className="icon" size={22.5} />
            </button>
          </div>
          <div className="tweet__share tweet__BottomItem">
            <button className="shareBtn">
              <MdIosShare className="icon" size={22.5} />
            </button>
          </div>
        </div>
        <div className="tweet__form">
          <div className="form-row">
            <div className="user-image">
              <img
                src={currentUser.avatarUrl}
                alt="profile image"
                className="profile-image"
              />
            </div>
            <form className="reply-form">
              <textarea
                type="text"
                className="replyInput"
                placeholder="Tweet your reply!"
                onChange={(e) => setReplyText(e.target.value)}
                ref={textAreaRef}
                value={replyText}
                maxLength={280}
              />
              <div className="reply-image">
                {replyImage ? (
                  <div className="image">
                    <button
                      className="removeImageBtn"
                      onClick={() => setReplyImage(null)}
                    >
                      <img
                        src="./assets/removeIcon.svg"
                        alt=""
                        className="removeImageIcon"
                      />
                    </button>
                    <img
                      src={replyImage}
                      style={{
                        objectFit: "contain",
                        borderRadius: ".8rem",
                      }}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="reply-form-bottom">
                <label htmlFor="uploadImg">
                  <RxImage className="uploadImgIcon" />
                </label>
                <input
                  type="file"
                  id="uploadImg"
                  accept="image/*"
                  onChange={(event) => {
                    const files = event.target.files;
                    if (files.length > 0) {
                      const imageUrl = URL.createObjectURL(files[0]);
                      setReplyImage(imageUrl);
                    }
                  }}
                />
                <button
                  className={`replyBtn ${replyText.length || replyImage ? "replyBtnActive" : ''}`}
                  type="submit"
                  onClick={(e) => handleReplySumit(e, id, false)}
                >
                  Reply
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="tweet__replies">
          {comments.map(comment => (
            <div className="tweet__comment" key={comment.id}>
              {comment.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullTweet;
