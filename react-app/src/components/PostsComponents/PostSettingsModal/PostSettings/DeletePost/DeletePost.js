import { useDispatch } from "react-redux";
import { deletePostThunk } from "../../../../../store/posts";
import "./DeletePost.css";

const DeletePost = ({ post, onClose, onClosePost }) => {
  const dispatch = useDispatch();

  console.log(onClose);

  const onDelete = async () => {
    await dispatch(deletePostThunk(post.id)).then(() => {
      if (onClose) {
        onClose();
      }
      onClosePost();
    });
  };

  return (
    <section
      className="delete-post-container"
      onClick={(e) => e.stopPropagation()}
    >
      <header className="delete-post-header">
        <div className="delete-post-header-one">Delete post?</div>
        <div className="delete-post-header-two">
          Are you sure you want to delete this post?
        </div>
      </header>
      <button className="delete-post-button delete" onClick={onDelete}>
        <strong>Delete</strong>
      </button>
      <button className="delete-post-button cancel" onClick={() => onClose()}>
        Cancel
      </button>
    </section>
  );
};

export default DeletePost;
