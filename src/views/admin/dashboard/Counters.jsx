import { Card, CardBody, CardTitle, Row, Col, Spinner } from 'reactstrap';
import { useEffect, useState } from 'react';
import axios from 'services/axios.inercept';
import './counters.css';
const xl = 2;
const lg = 4;
const md = 4;
function Counters() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/admin/dashboard/counters')
      .then((response) => {
        setLoading(false);
        setData(response.data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <>
      {loading === true && (
        <Spinner animation="border" role="status">
          {/* <span className="visually-hidden">Loading...</span> */}
        </Spinner>
      )}
      <Row className="dashboard-counters " style={{ width: '102%' }}>
        <Col
          // xl={xl}
          lg={lg}
          md={md}
          sm="6"
          className="dashboard-counters_bootStrap_numbers"
        >
          <Card className="card-stats">
            <CardBody className="dashboard-counter-col">
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-badge text-dark" />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers dashboard-counters_bootStrap_numbers">
                    <p className="card-category font-weight-bold">
                      طلبات التكويد
                    </p>
                    <CardTitle
                      tag="p"
                      className="font-weight-bolder"
                      style={{ fontSize: '1.26rem' }}
                    >
                      {data.requests?.toLocaleString('ar-EG')}
                    </CardTitle>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
            {/* <CardFooter>
              <hr />
            </CardFooter> */}
          </Card>
        </Col>
        <Col
          // xl={xl}
          lg={lg}
          md={md}
          sm="6"
          className="dashboard-counters_bootStrap_numbers"
        >
          <Card className="card-stats">
            <CardBody className="dashboard-counter-col">
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-bulb-63 text-info" />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers dashboard-counters_bootStrap_numbers">
                    <p className="card-category font-weight-bold">
                      طلبات التكويد اليوم
                    </p>
                    <CardTitle
                      tag="p"
                      className="font-weight-bolder"
                      style={{ fontSize: '1.26rem' }}
                    >
                      {data.requestsToday?.toLocaleString('ar-EG')}
                    </CardTitle>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
            {/* <CardFooter>
              <hr />
            </CardFooter> */}
          </Card>
        </Col>
        <Col
          // xl={xl}
          lg={lg}
          md={md}
          sm="6"
          className="dashboard-counters_bootStrap_numbers"
        >
          <Card className="card-stats">
            <CardBody className="dashboard-counter-col">
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-vector text-success" />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers dashboard-counters_bootStrap_numbers">
                    <p className="card-category font-weight-bold">
                      المحاصيل المكودة
                    </p>
                    <CardTitle
                      tag="p"
                      className="font-weight-bolder"
                      style={{ fontSize: '1.26rem' }}
                    >
                      {data.farms?.toLocaleString('ar-EG')}
                    </CardTitle>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
            {/* <CardFooter>
              <hr />
            </CardFooter> */}
          </Card>
        </Col>
        <Col
          // xl={xl}
          lg={lg}
          md={md}
          sm="6"
          className="dashboard-counters_bootStrap_numbers"
        >
          <Card className="card-stats">
            <CardBody className="dashboard-counter-col">
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-touch-id text-danger" />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers dashboard-counters_bootStrap_numbers">
                    <p className="card-category font-weight-bold">العملاء</p>
                    <CardTitle
                      tag="p"
                      className="font-weight-bolder"
                      style={{ fontSize: '1.26rem' }}
                    >
                      {data.users?.toLocaleString('ar-EG')}
                    </CardTitle>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
            {/* <CardFooter>
              <hr />
            </CardFooter> */}
          </Card>
        </Col>
        <Col
          // xl={xl}
          lg={lg}
          md={md}
          sm="6"
          className="dashboard-counters_bootStrap_numbers"
        >
          <Card className="card-stats">
            <CardBody className="dashboard-counter-col">
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-paper text-secondary" />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers dashboard-counters_bootStrap_numbers">
                    <p className="card-category font-weight-bold">الاخبار</p>
                    <CardTitle
                      tag="p"
                      className="font-weight-bolder"
                      style={{ fontSize: '1.26rem' }}
                    >
                      {data.posts?.toLocaleString('ar-EG')}
                    </CardTitle>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
            {/* <CardFooter>
              <hr />
            </CardFooter> */}
          </Card>
        </Col>
        <Col
          // xl={xl}
          lg={lg}
          md={md}
          sm="6"
          className="dashboard-counters_bootStrap_numbers"
        >
          <Card className="card-stats">
            <CardBody className="dashboard-counter-col">
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-tv-2 text-warning" />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers dashboard-counters_bootStrap_numbers">
                    <p className="card-category font-weight-bold">المشاهدات</p>
                    <CardTitle
                      tag="p"
                      className="font-weight-bolder"
                      style={{ fontSize: '1.26rem' }}
                    >
                      {data.views?.toLocaleString('ar-EG')}
                    </CardTitle>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
            {/* <CardFooter>
              <hr />
            </CardFooter> */}
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Counters;
