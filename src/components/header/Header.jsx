import React, { useEffect, useRef } from "react";
import { useContext, useState } from "react";
import DataContext from "../../context/DataContext";
import { RxImage } from "react-icons/rx";
const Header = () => {
  const {
    currentUser,
    textAreaValue,
    setTextAreaValue,
    image,
    setImage,
    handleSubmit,
  } = useContext(DataContext);
  const textAreaRef = useRef();

  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "40px";
      const taHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = taHeight + "px";
    }
  }, [textAreaValue]);

  return (
    <div className="Header">
      <div className="Header__top">
        <span className="Header__Path">Home</span>
        <div className="header__Tabs">
          <button className="forYou-tab Header__bottomBtn--active">
            For you
          </button>
          <button className="following-tab">Following</button>
        </div>
      </div>
      <form action="#" className="Header__TweetForm" onSubmit={handleSubmit}>
        <div className="form__profile">
          {currentUser && (
            <img src={currentUser.avatarUrl} alt="" className="curUserAvatar" />
          )}
        </div>
        <div className="form__inputField">
          <textarea
            type="text"
            name="form__inputField"
            id="form__inputField-id"
            placeholder="What is happening?!"
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
            ref={textAreaRef}
          />
          {image ? (
            <div className="image">
              <button className="removeImageBtn" onClick={() => setImage(null)}>
                <img
                  src="/assets/removeIcon.svg"
                  alt=""
                  className="removeImageIcon"
                />
              </button>
              <img
                src={image}
                style={{
                  maxWidth: "100%",
                  maxHeight: "650px",
                  objectFit: "contain",
                  borderRadius: ".8rem",
                }}
              />
            </div>
          ) : (
            <></>
          )}
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
                setImage(imageUrl);
              }
            }}
          />
        </div>
        <div className="form__tweetbtn">
          <button
            className={`tweetBtn ${
              (textAreaValue || image) && "tweetBtn-Active"
            }`}
            type="submit"
          >
            tweet
          </button>
        </div>
      </form>
    </div>
  );
};

export default Header;
