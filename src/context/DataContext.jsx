import { createContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext({});
export const DataProvider = ({ children }) => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [image, setImage] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [tweets, setTweets] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [replyImage, setReplyImage] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get("/data/currentUser.json");
        setCurrentUser(response.data.currentUser);
      } catch (err) {
        console.log('error' + err);
      }
    };
    getCurrentUser();
  }, []);

  const handleRetweet = (e, id) => {
    e.preventDefault();
    const updatedTweets = tweets.map((tweet) => {
      if (tweet.id === id) {
        return {
          ...tweet,
          retweets:
            tweet.retweets.filter((like) => like === currentUser.username)
              .length < 1
              ? [...tweet.retweets, currentUser.username]
              : tweet.retweets.filter((like) => like !== currentUser.username),
        };
      }
      return tweet; // Return the original tweet if it's not the one to be retweeted
    });
    setTweets(updatedTweets);
  };

  const handleLike = (e, id, setliked, liked) => {
    e.preventDefault();
    setliked(!liked);
    const updatedTweets = tweets.map((tweet) => {
      if (tweet.id === id) {
        return {
          ...tweet,
          likes:
            tweet.likes.filter((like) => like === currentUser.username).length <
            1
              ? [...tweet.likes, currentUser.username]
              : tweet.likes.filter((like) => like !== currentUser.username),
        };
      }
      return tweet; // Return the original tweet if it's not the one to be retweeted
    });
    setTweets(updatedTweets);
  };

  const handleSubmit = (e) => {
    const timestamp = new Date();
    e.preventDefault();
    setTweets((prevTweets) => [
      {
        id: prevTweets.length,
        user: {
          profileImg: currentUser.avatarUrl,
          name: currentUser.name,
          verified: currentUser.verified,
          username: currentUser.username,
        },
        text: textAreaValue,
        image: image,
        timestamp: timestamp,
        comments: [],
        retweets: [],
        quotes: 0,
        likes: [],
        bookmarks: 0,
        views: 0,
      },
      ...prevTweets,
    ]);
    setTextAreaValue("");
    setImage(null);
  };

  const deleteTweet = (e, id) => {
    e.preventDefault();
    const deletedTweet = tweets.filter((tweet) => tweet.id !== id);
    setTweets(deletedTweet);
  };

  const handleShowComment = (e, id, removeShow) => {
    e.preventDefault();
    removeShow ? setCommentId(null) : setCommentId(id);
    setShowCommentInput(!showCommentInput);
  };

  const handleReplySumit = (evnt, id, commentInput) => {
    evnt.preventDefault();

    const updatedTweets = tweets.map((tweet) => {
      if (tweet.id === id) {
        const newComment = {
          text: replyText,
          image: replyImage,
          id: Object.keys(tweets).length === 0 ? 1 : Object.keys(tweets).length - 1,
        };
        const updatedComments = [...tweet.comments, newComment];
        return {
          ...tweet,
          comments: updatedComments,
        };
      }
      return tweet;
    });
    setTweets(updatedTweets);
    commentInput && setShowCommentInput(!showCommentInput);
  };
  return (
    <DataContext.Provider
      value={{
        currentUser,
        textAreaValue,
        setTextAreaValue,
        image,
        setImage,
        handleSubmit,
        tweets,
        handleLike,
        handleRetweet,
        deleteTweet,
        setModalIsOpen,
        modalIsOpen,
        handleShowComment,
        commentId,
        showCommentInput,
        setReplyImage,
        setReplyText,
        replyText,
        replyImage,
        handleReplySumit,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
