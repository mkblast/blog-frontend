import { useEffect, useState } from "react";
import Post from "./Post";
import Styles from "./Posts.module.css";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://blog-api-mkblast.glitch.me/api/posts");
      const json = await res.json();

      setPosts(json);

    })();
  }, []);

  return (
    <div className={Styles.posts}>
      {
        posts.map(post => {
          return (
            <div key={post._id}>
              <Post {...post} />
            </div>
          );
        })
      }
    </div>
  );
}

export default Posts;
