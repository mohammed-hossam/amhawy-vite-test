import Sidebar from './components/Sidebar';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'services/axios.inercept';
import './clientPost.css';
import { Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';

function Post() {
  const params = useParams();
  // const [param, setParam] = useState(params.id);
  // console.log(params);
  const [mainViewData, setMainViewData] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(mainViewData);
  function load(id) {
    axios
      .get(`/client/posts/${id ? id : params.id}`)
      .then((data) => {
        // console.log(data.data.data);
        setMainViewData(data.data);
        setLoading(false);
      })
      .catch((e) => {
        // console.log(e);
        setLoading(false);
      });
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className="details-text-area ptb-100">
        <div className="container">
          <div className="row justify-content-center">
            {loading === true ? (
              <Spinner animation="border" role="status">
                {/* <span className="visually-hidden">Loading...</span> */}
              </Spinner>
            ) : (
              <>
                {/* main post data */}
                <div className="col-lg-8">
                  <div className="blog-details-text-area">
                    <img
                      className="details-main-img clientPostImg"
                      src={mainViewData.data.image}
                      alt="img"
                    />
                    <div className="bdt-text">
                      <div className="blog-date">
                        <ul>
                          <ul>
                            <li>المشاهدات {mainViewData.data.views}</li>
                          </ul>
                        </ul>
                      </div>
                      <h3 className="details-page-title">
                        {mainViewData.data.title}
                      </h3>

                      <p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: mainViewData.data.content,
                          }}
                        ></div>
                      </p>
                    </div>
                  </div>
                  <div className="blog-text-footer mt-30 pr-20">
                    <div className="tag-area">
                      <ul>
                        <li>
                          <span>
                            <i
                              className="fas fa-tags"
                              style={{ color: '#071327' }}
                            ></i>
                          </span>
                        </li>
                        {mainViewData.tags.map((el, index) => {
                          return (
                            <li>
                              <Link to={`/posts?search=${el}`}>
                                {el +
                                  `${
                                    mainViewData.tags.length === index + 1
                                      ? ''
                                      : ','
                                  }`}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="social-icons">
                      <ul>
                        <li className="ml-3">
                          <span>مشاركة:</span>
                        </li>
                        <li className="ml-3">
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=https://takweedegypt.com/post/${mainViewData.data._id}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li className="ml-3">
                          <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=https://takweedegypt.com/post/${mainViewData.data._id}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        </li>
                        <li className="ml-3">
                          <a
                            href={
                              'http://twitter.com/share?url=' +
                              encodeURIComponent(
                                `https://takweedegypt.com/post/${mainViewData.data._id}`
                              ) +
                              '&text=' +
                              encodeURIComponent(mainViewData.data.title)
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li className="ml-3">
                          <a
                            href={`https://wa.me/?text=https://takweedegypt.com/post/${mainViewData.data._id}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fab fa-whatsapp"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* sidebar */}

                <Sidebar
                  lastPosts={mainViewData.related}
                  load={load}
                  setLoading={setLoading}
                  tags={mainViewData.tags}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Post;
