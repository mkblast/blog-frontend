import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
      const [postJson, commentsJson] = await Promise.all([postStatus.json(), commentsStatus.json()])

      if (postStatus.status === 404) {
        return setStatus(postJson);
      }

      setPost(postJson);
      setComments(commentsJson);
    })();
  }, []);

  if (status) {
    return (
      <div>
        <p>{status.error}</p>
      </div>
    );
  }

  return (
    <>
      <p>{post.title}</p>
      <p>{post.body}</p>
      <div>
        {
          comments ?
            comments.length === 0 ?
              <p>No comments</p>
              :
              comments.map(comment => {
                return (
                  <div key={comment._id}>
                    <p>{comment.title}</p>
                    <p>{comment.body}</p>
                  </div>
                )
              })
            :
            <p>Loading Comments</p>
        }
      </div>
    </>
  );
}

export default Post;
