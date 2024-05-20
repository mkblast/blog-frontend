import { Link } from "react-router-dom";
import Styles from "./Post.module.css";
import { DateTime } from "luxon";
import PropTypes from 'prop-types';

function Post({ title, body, author, published_date, _id }) {
  const newBody = body.slice(0, 500);
  const newDate = DateTime.fromISO(published_date).toLocaleString(DateTime.DATE_FULL);

  return (
    <div className={Styles.post}>
      <Link to={`/posts/${_id}`} >
        <h1>{title}</h1>
        <p>{newBody}...</p>
        <div className={Styles.details}>
          <p>{author}</p>
          <p>{newDate}</p>
        </div>
      </Link>
    </div>
  );
}

Post.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  author: PropTypes.string,
  published_date: PropTypes.string,
  _id: PropTypes.string,
};

export default Post;
