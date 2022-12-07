import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './index.css';
import axios from 'services/axios.inercept';
import { Spinner } from 'reactstrap';

function IndexPage() {
  let history = useHistory();

  const [id, setId] = useState('');
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  function fetchData(id) {
    setLoading(true);
    axios
      .get(`/client/request/search/${id}`)
      .then((response) => {
        if (response.code !== 201) {
          //   console.log(response.data);
          const code = response.data.code;
          const name = response.data.crop.name_ar;
          const gov = response.data.farm.location.governorate.name_ar;
          setLoading(false);
          setData({ code, name, gov });
        }
      })
      .catch((e) => {
        setLoading(false);
        setData({
          code: <i className="nc-icon nc-simple-remove ourIcon" />,
          name: <i className="nc-icon nc-simple-remove ourIcon" />,
          gov: <i className="nc-icon nc-simple-remove ourIcon" />,
        });
      });
  }

  const search = (e) => {
    e.preventDefault();
    if (e.key === 'Enter' || id.length === 10) {
      if (
        !localStorage.getItem('token') &&
        !localStorage.getItem('user') &&
        localStorage.getItem('_r') !== '954VC58412cH1M'
      ) {
        history.push(`/login`);
      } else {
        fetchData(id);
      }
    }
  };

  return (
    <>
      <section className="uni-banner">
        <div className="container inputContainer">
          <input
            type="text"
            onKeyUp={search}
            onChange={(e) => {
              setId(e.target.value);
            }}
            className="SearchInput"
            placeholder=" كود الطلب"
          />

          {loading === true ? (
            <Spinner animation="border" role="status" className="spin">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            data && (
              <table class="table ourCard">
                <thead>
                  <tr>
                    <th scope="col">الكود</th>
                    <th scope="col">المحصول</th>
                    <th scope="col">المحافظة</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th dir="LTR" scope="row">
                      {data.code}
                    </th>
                    <td dir="RTL">{data.name}</td>
                    <td dir="LTR">{data.gov}</td>
                  </tr>
                </tbody>
              </table>
            )
          )}
        </div>
      </section>
    </>
  );
}

export default IndexPage;
