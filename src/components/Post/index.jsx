import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar from "../Home/NavigationBar";
import Styles from "./index.module.css";
import { DateTime } from 'luxon';
import Markdown from 'react-markdown';
import CommentForm from './CommentForm';


function Post() {
  const { postId } = useParams();
  const [status, setStatus] = useState(null);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      const postPromise = fetch(`https://blog-api-mkblast.glitch.me/api/posts/${postId}`);
      const commentsPromise = fetch(`https://blog-api-mkblast.glitch.me/api/posts/${postId}/comments`);

      const [postRes, commentsRes] = await Promise.all([postPromise, commentsPromise]);
      const [postJson, commentsJson] = await Promise.all([postRes.json(), commentsRes.json()]);

      if (postRes.status === 404) {
        return setStatus(postJson);
      }

      if (token) {
        const userRes = await fetch("https://blog-api-mkblast.glitch.me/api/users/me", {
          headers: {
            "Authorization": `bearer ${token}`
          }
        });
        const userJson = await userRes.json();
        if (userRes.ok) {
          setUser(userJson);
        }
      }

      setPost(postJson);
      setComments(commentsJson);
    })();
  }, [postId, token]);

  if (status) {
    return (
      <div>
        <p>{status.error}</p>
      </div>
    );
  }

  async function handleDelete(commentId) {
    const res = await fetch(`https://blog-api-mkblast.glitch.me/api/posts/${postId}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `bearer ${token}`
      }
    });

    const json = await res.json();

    if (!res.ok) {
      console.log(json);
    }

    setComments(prev => prev.filter(comment => comment._id !== commentId));
  }

  function handleEdit(commentId) {
    setComments(prev => prev.map(comment => (
      { ...comment, isEdit: comment._id === commentId ? true : comment.isEdit }
    )));
  }

  function handleEditChange(commentId, value) {
    setComments(prev => prev.map(comment => (
      { ...comment, edit: comment._id === commentId ? value : "" }
    )));
  }

  function handleCancel(commentId) {
    setComments(prev => prev.map(comment => (
      comment._id === commentId ?
        { ...comment, isEdit: false, edit: "" }
        :
        { ...comment }
    )));
  }

  async function handleSubmitChange(commentId, body) {
    const res = await fetch(`https://blog-api-mkblast.glitch.me/api/posts/${postId}/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`
      },
      body: JSON.stringify({
        body,
      }),
    });

    console.log(body);

    const json = await res.json();

    if (!res.ok) {
      return console.log(json);
    }

    setComments(prev => prev.map(comment => (
      json.update._id === comment._id ?
        { ...json.update, edit: "", isEdit: false }
        :
        comment
    )));
  }

  return (
    <>
      <NavigationBar />
      <div className={Styles.canvas}>
        {post ?
          <div className={Styles.post}>

            <div className={Styles.postTop}>
              <h1>{post.title}</h1>
              <div className={Styles.details}>
                <p>
                  By: {post.author}
                </p>
                <p> On: {
                  DateTime
                    .fromISO(post.published_date)
                    .toLocaleString(DateTime.DATE_FULL)
                } </p>
              </div>
            </div>
            <Markdown className={Styles.body}>{post.body}</Markdown>
          </div>
          :
          <></>
        }
        {token && post ?
          <CommentForm token={token} setComments={setComments} postId={postId} />
          :
          <></>
        }
        <div className={Styles.comments}>
          {
            comments ?
              comments.length === 0 ?
                <p>No comments</p>
                :
                comments.map(comment => {
                  return (
                    <div key={comment._id} className={Styles.comment}>
                      <div className={Styles.commentTop}>
                        <p>{comment.author}: </p>
                        <p>{
                          DateTime
                            .fromISO(comment.date)
                            .toLocaleString(DateTime.DATE_FULL)
                        }</p>

                      </div>
                      {comment.author_id === user._id && user ?
                        <>
                          {comment.isEdit ?
                            <>
                              <textarea
                                name="body"
                                cols="60"
                                rows="5"
                                defaultValue={comment.body}
                                onChange={e => handleEditChange(comment._id, e.target.value)}
                              >
                              </textarea>
                              <button onClick={() => handleCancel(comment._id)}>Cancel</button>
                              <button onClick={() => handleSubmitChange(comment._id, comment.edit)}>Done</button>
                            </>
                            :
                            <>
                              <p>{comment.body}</p>
                              <button onClick={() => handleEdit(comment._id)}>Edit</button>
                            </>
                          }
                          <button onClick={() => handleDelete(comment._id)}>Delete</button>
                        </>
                        :
                        <p>{comment.body}</p>
                      }
                    </div>
                  );
                })
              :
              <div></div>
          }
        </div>
      </div>
    </>
  );
}

export default Post;
