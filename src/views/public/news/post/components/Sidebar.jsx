import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { months } from "utils/date/date";

function Sidebar({ lastPosts, load, setLoading, tags }) {
  // console.log(lastPosts);
  const [input, setInput] = useState("");
  const history = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    //history.push not rereder when we go to the same component we are in
    if (input) history.push(`/posts?search=${input}`);
  }

  return (
    <div className="col-lg-4">
      <div className="sidebar-area pt-30 pl-20">
        <div class="sidebar-card search-box">
          <form onSubmit={handleSubmit}>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="بحث عن موضوع الخبر.."
                required
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <button class="btn" type="submit" style={{ padding: "1.2em" }}>
                <i class="fas fa-search"></i>
              </button>
            </div>
          </form>
        </div>

        <div className="sidebar-card recent-news">
          <h3>اخر الاخبار</h3>
          {lastPosts?.map((el, index) => {
            const month = el.createdAt.slice(5, 7);
            const day = Number(el.createdAt.slice(8, 10));
            const year = Number(el.createdAt.slice(0, 4));
            // console.log(el);

            return (
              <div key={index} className="recent-news-card">
                <Link
                  to={`/post/${el._id}`}
                  onClick={() => {
                    setLoading(true);
                    load(el._id);
                  }}
                >
                  <img src={el.image} alt="img" style={{ width: "6rem" }} />
                </Link>
                <h5>
                  <Link
                    to={`/post/${el._id}`}
                    onClick={() => {
                      setLoading(true);
                      load(el._id);
                    }}
                    style={{
                      // display: 'inline-block',
                      // whiteSpace: 'wrap',
                      // overflow: 'hidden',
                      // textOverflow: 'ellipsis',
                      // maxWidth: '20ch',
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: "2",
                      lineClamp: "2",
                      overflow: "hidden",
                    }}
                  >
                    {el.title}
                  </Link>
                </h5>
                <p>
                  <i className="far fa-calendar-alt"></i> {day.toLocaleString("ar-EG")}-
                  {months[month]}-{year.toLocaleString("ar-EG").replace(/٬/g, "")}
                </p>
              </div>
            );
          })}
        </div>

        <div className="sidebar-card sd-tag">
          <h3>الاكثر انتشارا</h3>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: "0.5em" }}>
            {tags.map((el) => {
              return (
                <li style={{ margin: "0" }}>
                  <Link to={`/posts?search=${el}`}>{el}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
