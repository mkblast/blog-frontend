import { Link } from "react-router-dom";
import Styles from "./Post.module.css";
import { DateTime } from "luxon";

function Post({ title, body, published_date, _id }) {
  const newBody = body.slice(0, 500);
  const newDate = DateTime.fromISO(published_date).toLocaleString(DateTime.DATE_FULL);

  return (
    <div className={Styles.post}>
      <Link to={`/posts/${_id}`} >
        <h1>{title}</h1>
        <p>{newBody}...</p>
        <p>{newDate}</p>
      </Link>
    </div>
  );
}

export default Post;
