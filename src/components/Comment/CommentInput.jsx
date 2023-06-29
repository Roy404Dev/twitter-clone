import React, { useContext, useEffect, useRef, useState } from "react";
import DataContext from "../../context/DataContext";
import { AiOutlineClose } from "react-icons/ai";
import { RxImage } from "react-icons/rx";
const CommentInput = ({id}) => {
  const {
    tweets,
    handleShowComment,
    currentUser,
    setReplyText,
    setReplyImage,
    replyText,
    replyImage,
    handleReplySumit
  } = useContext(DataContext);
  const commentTweet = tweets.filter((tweet) => tweet.id === id); //modified
  const { timestamp } = commentTweet[0];
  const textAreaRef = useRef(null);

  useEffect(() => {
    //grow textarea
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "40px";
      const taHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = taHeight + "px";
    }
  }, [replyText]);

  const f = Intl.DateTimeFormat("en-us", {
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  return (
    <div className="CommentArea">
      <div className="CommentInput">
        <div className="CommentInput__topSection">
          <button
            className="CommentInput__close"
            onClick={(e) => handleShowComment(e, id, true)}
            tabIndex={0}
          >
            <AiOutlineClose size={20} color="white" />
          </button>
        </div>
        <div className="CommentInput__main">
          <div className="tweet">
            <div className="tweet__topWrapper">
              <div className="tweet__profileMain">
                <div className="tweet__profile">
                  <img
                    src={commentTweet[0].user.profileImg}
                    alt="profile image"
                    className="tweet__profileImage"
                  />
                </div>
                <div className="tweet__content">
                  <div className="tweet__headerMain">
                    <div className="userInfo row">
                      <span className="tweet__name">
                        {commentTweet[0].user.name}
                      </span>
                      {commentTweet[0].user.verified && (
                        <MdVerified color="#FFD700" />
                      )}
                      <span className="tweet__username">
                        {commentTweet[0].user.username}
                      </span>
                      <span className="tweet__timestamp--circle">●</span>
                      <span className="tweet__timestamp">
                        {f.format(timestamp)}
                      </span>
                    </div>
                  </div>
                  <div className="tweet__primaryHeading">
                    <span>{commentTweet[0].text}</span>
                  </div>
                </div>
              </div>
              <div className="tweet__replaying">
                <div className="tweet__replaying-left">
                  <div className="verticalBar"></div>
                </div>
                <div className="tweet__replaying-right" tabIndex={0}>
                  <span className="tweet__replayingText">Replying to </span>
                  <span className="replyingUsername">
                    {commentTweet[0].user.username}
                  </span>
                </div>
              </div>
              <form action="#" className="commentForm">
                <div className="commentForm-top">
                  <img
                    src={currentUser.avatarUrl}
                    alt="current user img"
                    className="curUserAvatar"
                  />
                  <textarea
                    type="text"
                    className="replyInput"
                    placeholder="Tweet your reply!"
                    onChange={(e) => setReplyText(e.target.value)}
                    ref={textAreaRef}
                    value={replyText}
                    maxLength={280}
                  />
                </div>
                {replyImage && (
                  <div className="replyImageContainer">
                    <button
                      className="removeImageBtn"
                      onClick={() => setReplyImage(null)}
                    >
                      <img
                        src="src/assets/removeIcon.svg"
                        alt=""
                        className="removeImageIcon"
                      />
                    </button>
                    <img
                      src={replyImage}
                      alt="reply image"
                      className="replyImage"
                    />
                  </div>
                )}
                <div className="bottomInputs">
                  <div className="inputImage">
                    <label htmlFor="replyUploadImg" tabIndex={0}>
                      <RxImage className="uploadImgIcon" />
                    </label>
                    <input
                      type="file"
                      id="replyUploadImg"
                      accept="image/*"
                      onChange={(event) => {
                        const files = event.target.files;
                        if (files.length > 0) {
                          const imageUrl = URL.createObjectURL(files[0]);
                          setReplyImage(imageUrl);
                        }
                      }}
                    />
                  </div>
                  <div className="bottomInputs-right">
                    {replyText.length > 0 && (
                      <div
                        className="circleCharCount"
                        style={{
                          borderColor:
                            replyText.length - 280 === 0 ? "red" : "",
                        }}
                      >
                        {replyText.length > 259 && (
                          <span
                            className="charCount"
                            style={{
                              color: replyText.length - 280 === 0 ? "red" : "",
                            }}
                          >
                            {280 - replyText.length}
                          </span>
                        )}
                      </div>
                    )}
                    <button
                      className={`replyBtn ${
                        replyText.length && "replyBtnActive"
                      }`} type="submit" onClick={(e) => handleReplySumit(e, id, true)}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
