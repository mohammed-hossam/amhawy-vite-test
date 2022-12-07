import React, { useEffect, useRef, useState } from 'react';
import Filter from './components/filter/Filter';
import axios from 'services/axios.inercept';
import Post from './components/postCard/Post';
import { Button, Spinner } from 'reactstrap';
import './all.css';
// import { useQuery } from '../../../utils/customHooks/useQuery';
import { useLocation } from 'react-router';

function Topic() {
  const cache = useRef({});
  // console.log(cache.current);

  // refactor
  const location = useLocation();
  const urlParams = location.search;
  const ParamsArray = urlParams.split('=');
  const paramNam = ParamsArray[0].substring(1);
  const paramValue = ParamsArray[1];
  // console.log(paramValue);
  const [param, setParam] = useState(
    paramNam ? { name: paramNam, value: paramValue } : ''
  );

  const [mainViewData, setMainViewData] = useState([]);
  let [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  //load all posts at first time for one random topic or for specific topicid if there is id input
  function load(page = 1, paramObject = '') {
    let param = '';
    // if (topicId) {
    //   param = '?topicId=' + topicId;
    // } else if (input) {
    //   param = '?search=' + input;
    // }

    //refactor
    if (paramObject) {
      param = `?${paramObject.name}=${paramObject.value}`;
    }
    // console.log(cache.current[`${param}-${page}`]);
    if (param === '') {
      if (cache.current[`none-${page}`]) {
        return new Promise((resolve, reject) => {
          const data = cache.current[`none-${page}`];
          setMainViewData(data);
          setPage(page);
          setLoading(false);
          return data;
        });
      }
    }
    if (cache.current[`${param}-${page}`]) {
      return new Promise((resolve, reject) => {
        const data = cache.current[`${param}-${page}`];
        setMainViewData(data);
        setPage(page);
        setLoading(false);
        return data;
      });
    }

    return axios
      .get('/client/posts' + param, {
        headers: { sortBy: 'createdAt', sortValue: -1, page },
      })
      .then((data) => {
        setMainViewData(data.data.data);
        setPage(page);
        setLoading(false);
        if (param === '') {
          cache.current[`none-${page}`] = data.data.data;
        } else {
          cache.current[`${param}-${page}`] = data.data.data; // set response in cache;
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }

  const disablNext = () => {
    if (mainViewData.length === 0 || mainViewData.length < 12) return true;
  };
  const disablLast = () => {
    if (page <= 1) return true;
  };

  const next = () => {
    setLoading(true);

    // if (query.has('search')) {
    //   return load(page + 1, null, query.get('search'));
    // }
    // if (query.has('topicId')) {
    //   return load(page + 1, query.get('topicId'));
    // }

    // load(page + 1).then(() => setPage(page + 1));

    // refactor
    // console.log(param);
    load(page + 1, param).then(() => setPage(page + 1));
  };
  const last = () => {
    setLoading(true);

    // if (query.has('search')) {
    //   return load(page - 1, null, query.get('search'));
    // }
    // if (query.has('topicId')) {
    //   return load(page - 1, query.get('topicId'));
    // }

    // load(page - 1).then(() => setPage(page - 1));

    // refactor
    load(page - 1, param).then(() => setPage(page - 1));
  };

  useEffect(() => {
    // coming from anothr component with params (search param from post component)
    // if (query.has('search')) {
    //   return load(page, null, query.get('search'));
    // }
    // if (query.has('topicId')) {
    //   return load(page, query.get('topicId'));
    // }

    //load all posts at first time
    // load(page);

    //refactor
    load(page, param);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return (
    <>
      <section className="blog pt-50 pb-100">
        <div className="container">
          <Filter
            loadByTopic={load}
            setPage={setPage}
            setLoading={setLoading}
            setParam={setParam}
          />

          {/* main news data from the server */}
          <div className="row">
            {loading === true ? (
              <div className="clientpostsSpinner">
                <Spinner
                  animation="border"
                  role="status"
                  style={{ padding: '2em' }}
                ></Spinner>
              </div>
            ) : (
              mainViewData.map((el, index) => {
                // console.log(el);
                return <Post key={index} data={el} />;
              })
            )}
          </div>

          <div className="row justify-content-center h2 mt-5">
            {loading === false && !mainViewData.length > 0
              ? 'لا يوجد نتائج للبحث'
              : ''}
          </div>

          {/* pagination */}
          {!loading && mainViewData.length > 0 && (
            <div className="paginations mt-30">
              <Button
                className="allPostsBtn"
                disabled={disablLast()}
                onClick={last}
              >
                السابق
              </Button>
              <Button
                className="allPostsBtn"
                disabled={disablNext()}
                onClick={next}
              >
                التالي
              </Button>
            </div>
          )}

          {/* {errorMsg && <div>error</div>} */}
        </div>
      </section>
    </>
  );
}

export default Topic;
