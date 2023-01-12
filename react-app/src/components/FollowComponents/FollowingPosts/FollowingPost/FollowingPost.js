import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFollowingPosts } from "../../../../store/posts";
import {
  createPostLikeThunk,
  deletePostLikeThunk,
} from "../../../../store/likes";
import { createCommentThunk } from "../../../../store/comments";
import PostLikesModal from "../../../PostsComponents/PostLikesModal";
import PostSettingsModal from "../../../PostsComponents/PostSettingsModal";
import { NavLink } from "react-router-dom";
import PostModal from "../../../PostsComponents/PostModal/PostModal";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/navigation/navigation.min.css";

// import required modules
import { Navigation, Pagination } from "swiper";
import "./FollowingPost.css";

const FollowingPost = ({ post, key }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const currentUser = useSelector((state) => state.session.user);
  const prevSlide = useRef(null);
  const nextSlide = useRef(null);

  useEffect(() => {
    const submitButton = document.querySelector(
      `.following-post-create-comment-submit-${post.id}`
    );
    if (comment && submitButton) {
      submitButton.removeAttribute("disabled");
      submitButton.classList.add("typed");
    } else if (submitButton) {
      submitButton.setAttribute("disabled", "");
      submitButton.classList.remove("typed");
    }
  }, [comment, post.id]);

  const onLike = (postId) => {
    dispatch(createPostLikeThunk(postId)).then(() => {
      dispatch(loadFollowingPosts());
    });
  };

  const onUnlike = (post) => {
    dispatch(
      deletePostLikeThunk(currentUser.id, post.likes[currentUser.id].id)
    ).then(() => {
      dispatch(loadFollowingPosts());
    });
  };

  const updateComment = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = async (e, post) => {
    e.preventDefault();
    const payload = { comment };
    await dispatch(createCommentThunk(post.id, payload)).then(() => {
      setComment("");
      dispatch(loadFollowingPosts());
    });
  };

  return (
    <div className="following-post-container">
      <header className="following-post-header">
        <NavLink
          to={`/${post.owner.username}`}
          className="following-post-user-link"
        >
          <div className="following-post-header-user-info">
            <img
              className="following-post-header-profile-image"
              src={post.owner.profileImg}
              alt="follow profile"
            />
            <div>{post.owner.username}</div>
          </div>
        </NavLink>
        {post.owner.id === currentUser.id && <PostSettingsModal post={post} />}
      </header>
      <div className="following-post-content-container">
        <Swiper
          cssMode={true}
          navigation={{
            prevEl: prevSlide.current,
            nextEl: nextSlide.current,
          }}
          pagination={true}
          modules={[Navigation, Pagination]}
          className="following-post-content-container-swiper"
          style={{
            "--swiper-pagination-color": "white",
            "--swiper-pagination-bullet-inactive-color": "#999999",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": ".6rem",
            "--swiper-pagination-bullet-horizontal-gap": ".2rem",
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevSlide.current;
            swiper.params.navigation.nextEl = nextSlide.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {Object.values(post.images).map((image, i) => {
            return (
              <SwiperSlide className="following-post-swiper-container" key={i}>
                <img
                  className="following-post-content"
                  src={image.imageUrl}
                  alt="follow content"
                />
              </SwiperSlide>
            );
          })}
          {Object.values(post.images).length > 1 && (
            <>
              <div className="following-post-swiper-left" ref={prevSlide}>
                <i className="fa-solid fa-chevron-left"></i>
              </div>
              <div className="following-post-swiper-right" ref={nextSlide}>
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </>
          )}
        </Swiper>
      </div>
      <section className="following-post-actions-container">
        <div className="following-post-actions">
          {!post.likes[currentUser.id] ? (
            <button
              className="following-post-actions-like-button"
              onClick={() => onLike(post.id)}
            >
              <i className="fa-regular fa-heart following-post-actions-button"></i>
            </button>
          ) : (
            <button
              className="following-post-actions-unlike-button"
              onClick={() => onUnlike(post)}
            >
              <i className="fa-solid fa-heart following-post-actions-button"></i>
            </button>
          )}
          <PostModal post={post} type="following-post-comment" />
        </div>
        <PostLikesModal likes={post.likes} />
      </section>
      {post.description && (
        <div className="following-post-description">
          <strong>
            <NavLink
              className="following-post-user-link"
              to={`/${post.owner.username}`}
            >
              {post.owner.username}
            </NavLink>
          </strong>
          <div>{post.description}</div>
        </div>
      )}
      <PostModal post={post} type="following-posts" />
      <form
        className="following-post-create-comment-form"
        onSubmit={(e) => onSubmit(e, post)}
      >
        <input
          id="following-post-create-comment-input"
          className="following-post-create-comment-input"
          placeholder="Add a comment..."
          value={comment}
          onChange={updateComment}
        />
        <button
          className={`following-post-create-comment-submit following-post-create-comment-submit-${post.id}`}
          disabled
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default FollowingPost;
