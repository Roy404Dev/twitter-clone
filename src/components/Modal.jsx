import React from "react";
import { BiTrash, BiBarChart } from "react-icons/bi";
import { BsPin, BsStars, BsCodeSlash } from "react-icons/bs";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
const Modal = ({ deleteTweet, id }) => {
  return (
    <div className="menuModal">
      <div className="modal__delete modal__item" onClick={(e) => deleteTweet(e, id)}>
        <BiTrash color="#E11E2A" />
        <span style={{ color: "#E11E2A" }}>Delete</span>
      </div>
      <div className="modal__pin modal__item">
        <BsPin />
        <span>Pin to your profile</span>
      </div>
      <div className="modal__highlight modal__item">
        <BsStars />
        <span>Highlight with Twitter Blue</span>
      </div>
      <div className="modal__addRemoveList modal__item">
        <MdOutlinePostAdd />
        <span>Add/remove @PLBMROY from Lists</span>
      </div>
      <div className="modal__changeReply modal__item">
        <FaRegComment />
        <span>Change who can reply</span>
      </div>
      <div className="modal__embedTweet modal__item">
        <BsCodeSlash />
        <span>Embed Tweet</span>
      </div>
      <div className="modal__tweetAnalytics modal__item">
        <BiBarChart />
        <span>View Tweet analytics</span>
      </div>
    </div>
  );
};

export default Modal;
