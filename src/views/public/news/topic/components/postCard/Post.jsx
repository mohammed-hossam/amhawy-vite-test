import React from 'react';
import { Link } from 'react-router-dom';
import { months } from 'utils/date/date';
import './post.css';

function Post({ data }) {
  const { createdAt, image, title, views, _id } = data;
  const month = createdAt.slice(5, 7);
  const day = Number(createdAt.slice(8, 10));
  // console.log(Number(day));
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 col-12 d-inline-flex align-items-stretch">
      <div className="blog-card blog-card-2 w-100">
        <div className="blog-img-area">
          <Link to={`/post/${_id}`}>
            <img src={image} alt="img" style={{ height: '10rem' }} />
          </Link>
          <div className="blog-img-date">
            <span>{day.toLocaleString('ar-EG')}</span>
            <span>{months[month]}</span>
          </div>
        </div>
        <div className="blog-text-area border-0">
          <div className="blog-date">
            <ul>
              <li>المشاهدات {views}</li>
            </ul>
          </div>
          <h4>
            <Link to={`/post/${_id}`} className="topic_card_title">
              {title}
            </Link>
          </h4>
          <Link className="default-button default-button-2" to={`/post/${_id}`}>
            التفاصيل <i className="fas fa-arrow-left"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Post;
