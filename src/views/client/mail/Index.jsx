import React, { useEffect, useState } from 'react';
import axiosApiInstance from 'services/axios.inercept';

function Index(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosApiInstance
      .get('/client/messages')
      .then((response) => {
        if (response.data.length > 0) {
          setLoading(false);
          // console.log(response.data.data);
          setData(response.data.data);
        }
      })
      .catch((e) => console.error(e));
  }, []);
  return (
    <div>
      {loading === false &&
        data?.map((item) => (
          <div className="card">
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{item.title}</li>
                <li className="list-group-item">{item.content}</li>
              </ul>
              <div className="card-footer">
                <span className="badge bg-success">{item.sender}</span>
              </div>
            </div>
          </div>
        ))}

      {loading === true && (
        <div className="text-center">
          {/* <img src="/assets/images/empty.png" alt="img" /> */}
          <p style={{ fontSize: '2rem' }}>لا يوجد رسائل</p>
        </div>
      )}
    </div>
  );
}

export default Index;
