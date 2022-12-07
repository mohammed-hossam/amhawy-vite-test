import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import axios from 'axios';
// import { actions } from 'contexts/user';
// import { UserContext } from 'contexts/user';

function Index(props) {
  // const [state, dispatch] = useContext(UserContext);
  const [info] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem('info');
    return JSON.parse(saved) || 'unkown';
  });

  const [weatherapi, setWeatherapi] = useState({});

  useEffect(() => {
    axios
      .get(
        'https://api.weatherapi.com/v1/current.json?key=e08c67f2a6784db987392756212712&q=cairo&aqi=no'
      )
      .then((response) => {
        // console.log(response.data);
        setWeatherapi(response.data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              <h4>
                <i className="far fa-user-circle"></i> مرحبا , {info.name}{' '}
              </h4>
            </div>
          </div>
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <i className="fas fa-phone"></i> {info.phone}
              </li>
              <li className="list-group-item">
                <i className="fas fa-envelope"></i> {info.email}
              </li>
            </ul>
          </div>
          <Link to="/login">
            <Button
              block
              color="danger"
              // onClick={() => {
              //   console.log(actions.SET_AUTH);
              //   // dispatch({ type: actions.SET_AUTH });
              // }}
            >
              تسجيل الخروج
            </Button>
          </Link>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <p>
                {weatherapi?.current?.condition?.text}{' '}
                <img
                  src={weatherapi?.current?.condition.icon}
                  alt={weatherapi?.current?.condition.text}
                />
              </p>

              <p>
                {weatherapi?.location?.country +
                  ' , ' +
                  weatherapi?.location?.region}
              </p>
              <p>{weatherapi?.location?.localtime}</p>
              <p>{weatherapi?.current?.temp_c}/ °C</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
