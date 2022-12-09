import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "services/axios.inercept";
import "./filter.css";
function Filter({ setLoading, setParam, setPage }) {
  // const [topics, setTopics] = useState([]);
  const [active, setActive] = useState("");
  const [input, setInput] = useState("");
  const history = useNavigate();
  const inputField = useRef();
  const cashAllTopics = useRef([]);
  // console.log(cashAllTopics);

  function handleSubmit(e) {
    e.preventDefault();
    if (input) {
      history.push(`/posts?search=${input}`);
      setLoading(true);
      setInput("");
      inputField.current.blur();
      // console.log(inputField.current);
      // loadByTopic(1, null, input);

      //refactor
      setParam({ name: "search", value: input });
    }
  }

  function load() {
    axios.get("/client/topics").then((data) => {
      const allTopics = data.data.data;
      cashAllTopics.current = allTopics;
    });
    // axios.get('/client/topics').then((data) => {
    //   // console.log(data.data.data);
    //   setTopics(data.data.data);
    // });
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="sidebar-card sd-tag" style={{ padding: "0.8em 1.7em" }}>
      {/* search */}
      <div className="sidebar-card search-box">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="بحث عن موضوع الخبر.."
              required
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              ref={inputField}
            />
            <button className="btn" type="submit" style={{ padding: "1.2em" }}>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>

      {/* category filter */}
      <ul className="scrollTopics text-center">
        {cashAllTopics.current.map((el, index) => {
          return (
            <li
              style={{ marginLeft: "1em", marginRight: "0" }}
              key={index}
              onClick={() => {
                // history.push(`/posts?topicId=${el._id}`);
                //i use window as i cant find something in reactrouter that change url without redirect (history.push redirect)
                // window.history.replaceState(
                //   null,
                //   'postsByTopic',
                //   `/posts?topicId=${el._id}`
                // );
                // console.log(el._id);
                setActive(el._id);
                setLoading(true);
                // loadByTopic(1, el._id);
                //refactor
                setPage(1);
                setParam({ name: "topicId", value: el._id });
              }}
            >
              <Link
                // style={{
                //   backgroundColor: `${active === el._id ? '#3f9f42' : ''}`,
                // }}
                to={`/posts?topicId=${el._id}`}
                className={`${active === el._id ? "filterActive" : ""}`}
              >
                {el.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Filter;
