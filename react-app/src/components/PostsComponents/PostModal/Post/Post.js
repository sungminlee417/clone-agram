// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/navigation/navigation.min.css";

// import required modules
import { Navigation, Pagination } from "swiper";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CreateComment from "../../../CommentComponents/CreateComment";
import PostModalComments from "../../../CommentComponents/PostModalComments";
import PostActions from "../../PostActions/PostActions";
import PostSettingsModal from "../../PostSettingsModal";
import "./Post.css";

const Post = ({ post, onClose }) => {
  const currentUser = useSelector((state) => state.session.user);
  const prevSlide = useRef(null);
  const nextSlide = useRef(null);

  return (
    <section
      className="single-post-container"
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={onClose} className="single-post-close-button">
        <i className="fa-solid fa-xmark"></i>
      </button>
      <Swiper
        cssMode={true}
        navigation={{
          prevEl: prevSlide.current,
          nextEl: nextSlide.current,
        }}
        pagination={true}
        modules={[Navigation, Pagination]}
        className="single-post-content-swiper"
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
        {Object.values(post.images).map((image) => {
          return (
            <SwiperSlide
              className="single-post-content-container"
              key={image.id}
            >
              <img
                className="single-post-content"
                src={image.imageUrl}
                alt="follow content"
              />
            </SwiperSlide>
          );
        })}
        {Object.values(post.images).length > 1 && (
          <>
            <div className="single-post-swiper-left" ref={prevSlide}>
              <i className="fa-solid fa-chevron-left"></i>
            </div>
            <div className="single-post-swiper-right" ref={nextSlide}>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </>
        )}
      </Swiper>
      <div className="single-post-description-container">
        <div className="single-post-description-header">
          <NavLink
            className="single-post-owner-link"
            to={`/${post.owner.username}`}
            onClick={onClose}
          >
            <div className="single-post-description-header-user">
              <img
                className="single-post-description-header-user-profile"
                src={post.owner.profileImg}
                alt="profile pic"
              />
              <div>
                <strong>{post.owner.username}</strong>
              </div>
            </div>
          </NavLink>
          {currentUser.id === post.owner.id && (
            <PostSettingsModal onClose={onClose} post={post} />
          )}
        </div>
        <div className="single-post-description-comments-container">
          {post?.description && (
            <div className="single-post-description">
              <NavLink to={`/${post.owner.username}`}>
                <img
                  className="single-post-description-user-profile"
                  src={post.owner.profileImg}
                  alt="profile pic"
                />
              </NavLink>
              <div className="single-post-description-text">
                <NavLink
                  to={`/${post.owner.username}`}
                  className="single-post-description-text-user-link"
                >
                  <strong>{post.owner.username} </strong>
                </NavLink>
                <div>{post.description}</div>
              </div>
            </div>
          )}
          <PostModalComments post={post} />
        </div>
        <PostActions post={post} type="user-profile" />
        <CreateComment post={post} type="user-profile" />
      </div>
    </section>
  );
};

export default Post;
