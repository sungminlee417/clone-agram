import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPosts, loadAllPostsThunk } from "../../../store/posts";
import PostModal from "../PostModal";
import "./AllPosts.css";

const AllPosts = () => {
  const dispatch = useDispatch();
  const posts = Object.values(useSelector((state) => state.posts));

  useEffect(() => {
    dispatch(loadAllPostsThunk());

    return () => dispatch(clearPosts());
  }, [dispatch]);

  return (
    <section className="all-posts-section">
      <div className="all-posts-container">
        {posts.reverse().map((post, i) => {
          return <PostModal post={post} type="all-posts" key={i} />;
        })}
      </div>
    </section>
  );
};

export default AllPosts;
