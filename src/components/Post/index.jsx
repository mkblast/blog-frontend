import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar from "../Home/NavigationBar";
import Styles from "./index.module.css";
import { DateTime } from 'luxon';
import Markdown from 'react-markdown';

function Post() {
  const { postId } = useParams();
  const [status, setStatus] = useState();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState(null);

  useEffect(() => {
    (async () => {
      const postPromise = fetch(`https://blog-api-mkblast.glitch.me/api/posts/${postId}`);
      const commentsPromise = fetch(`https://blog-api-mkblast.glitch.me/api/posts/${postId}/comments`);

      const [postStatus, commentsStatus] = await Promise.all([postPromise, commentsPromise]);
      const [postJson, commentsJson] = await Promise.all([postStatus.json(), commentsStatus.json()]);


      if (postStatus.status === 404) {
        return setStatus(postJson);
      }

      setPost(postJson);
      setComments(commentsJson);
    })();
  }, [postId]);

  if (status) {
    return (
      <div>
        <p>{status.error}</p>
      </div>
    );
  }

  return (
    <>
      <NavigationBar />
      <div className={Styles.canvas}>
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
                      <p>{comment.body}</p>
                    </div>
                  );
                })
              :
              <p>Loading Comments</p>
          }
        </div>

      </div>
    </>
  );
}

export default Post;
