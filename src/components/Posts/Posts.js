import React, { useEffect, useState } from "react";
import { deletePost } from "../../actions/postAction";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../actions/postAction";
import { Table } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import SweetAlert from "react-bootstrap-sweetalert";
import { useToasts } from "react-toast-notifications";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const [postId, setPostId] = useState(null);
  const { addToast } = useToasts();

  useEffect(() => {
    dispatch(getPosts());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="row">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>City</th>
            <th>Email</th>
            <th colSpan="2" align="center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((postItem) => (
            <tr key={postItem.id}>
              <td>{postItem.id}</td>
              <td>{postItem.name}</td>
              <td>{postItem.username}</td>
              <td>{postItem.address.city}</td>
              <td>{postItem.email}</td>
              <td>
                <Link
                  to={`/updatePost/${postItem.id}`}
                  className="btn btn-edit"
                >
                  <PencilSquare />
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-delete"
                  onClick={() => {
                    setPostId(postItem.id);
                  }}
                >
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {postId ? (
        <SweetAlert
          warning
          showCancel
          confirmBtnText="Yes"
          confirmBtnBsStyle="danger"
          title="Are you sure want to delete this post?"
          onConfirm={() => {
            dispatch(deletePost(postId));
            setPostId(null);
            addToast(`Post deleted successfully`, {
              appearance: "success",
              autoDismissTimeout: 3000,
              autoDismiss: true,
            });
          }}
          onCancel={() => {
            setPostId(null);
          }}
          focusCancelBtn
        ></SweetAlert>
      ) : (
        ""
      )}
    </div>
  );
};

export default Posts;
