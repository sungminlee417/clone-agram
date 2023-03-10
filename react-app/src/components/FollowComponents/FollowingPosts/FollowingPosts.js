import { useDispatch, useSelector } from "react-redux";
import "./FollowingPosts.css";
import FollowingPost from "./FollowingPost/FollowingPost";
import { useEffect } from "react";
import { clearPosts, loadFollowingPosts } from "../../../store/posts";
import {
  clearFollowings,
  loadSessionUserFollowings,
} from "../../../store/sessionUserFollowings";

const FollowingPosts = () => {
  const dispatch = useDispatch();
  const posts = Object.values(useSelector((state) => state.posts));

  useEffect(() => {
    dispatch(loadFollowingPosts());
    dispatch(loadSessionUserFollowings());

    return () => {
      dispatch(clearPosts());
      dispatch(clearFollowings());
    };
  }, [dispatch]);

  return (
    <section className="following-posts-section">
      <div className="following-posts-container">
        {posts.reverse().map((post) => {
          return (
            <div key={post.id}>
              <FollowingPost post={post} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FollowingPosts;
