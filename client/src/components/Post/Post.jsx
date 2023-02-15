import {formatISO9075} from "date-fns"
import {Link} from "react-router-dom";

const Post = ({
    _id,
    title,
    summary,
    img,
    createdAt,
    author
}) => {

    return (
      <div className="post">
        <Link to={`/post/${_id}`}>
          <img
            src={`https://fullstack-blog-app.onrender.com/${img}`}
            alt=""
          />
        </Link>
        <div className="info">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p className="date">
            <a className="author">{author.username}</a>
            <time>
              {formatISO9075(new Date(createdAt), "MMM d, yyyy HH:mm")}
            </time>
          </p>
          <p className="desc">{summary}</p>
        </div>
      </div>
    );
}

export default Post