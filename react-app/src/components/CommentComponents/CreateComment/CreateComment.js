import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { createCommentThunk } from "../../../store/comments";
import { loadFollowingPosts } from "../../../store/posts";
import "./CreateComment.css";

const CreateComment = ({ post }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const location = useLocation();

  useEffect(() => {
    const submitButton = document.querySelector(".create-comment-submit");
    if (comment) {
      submitButton.removeAttribute("disabled");
      submitButton.classList.add("typed");
    } else {
      submitButton.setAttribute("disabled", "");
      submitButton.classList.remove("typed");
    }
  }, [comment]);

  const updateComment = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = { comment };
    await dispatch(createCommentThunk(post.id, payload)).then(() => {
      setComment("");
      if (location.pathname === "/") dispatch(loadFollowingPosts());
    });
  };

  return (
    <form className="create-comment-form" onSubmit={onSubmit}>
      <input
        id="create-comment-input"
        className="create-comment-input"
        placeholder="Add a comment..."
        value={comment}
        onChange={updateComment}
      />
      <button className="create-comment-submit" disabled type="submit">
        Post
      </button>
    </form>
  );
};

export default CreateComment;
