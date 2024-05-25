import { useRef, useState } from "react";

function CommentForm({ token, setComments, postId }) {
  const [comment, setComment] = useState("");
  const textarea = useRef(null);

  function handleChange(value) {
    console.log(value);
    setComment(value);
  }

  async function handleSubmit() {
    const res = await fetch(`http://https://blog-api-mkblast.glitch.me/api/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`
      },
      body: JSON.stringify({
        body: comment,
      }),
    });

    const json = await res.json();

    if (res.ok) {
      textarea.current.value = '';
      setComment("");
      return setComments(prev => ([json.comment, ...prev]));
    }

    return console.log(json);
  }

  return (
    <form onSubmit={e => {
      e.preventDefault();
      handleSubmit();
    }}>
      <textarea name="body" cols="60" rows="5" placeholder="Write a comment." onChange={e => handleChange(e.target.value)} ref={textarea}></textarea>
      <button>Post</button>
    </form>
  );
}

export default CommentForm;
