import React from 'react';
import {
  Badge,
  Card,
  CardTitle,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Table,
} from 'reactstrap';
// import axios from 'services/axios.inercept';
// function validURL(str) {
//   var pattern = new RegExp(
//     '^(https?:\\/\\/)?' + // protocol
//       '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
//       '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
//       '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
//       '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
//       '(\\#[-a-z\\d_]*)?$',
//     'i'
//   ); // fragment locator
//   return !!pattern.test(str);
// }

const Details = ({ parent }) => {
  // console.log(parent);

  // const handelDownload = async (item) => {
  //   axios
  //     .get('/client/request/sign/' + item.code + '.pdf')
  //     .then((response) => {
  //       const url = response.data.url[0];
  //       if (validURL(url)) {
  //         window.location.href = url;
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // };
  return (
    <Container className="content text-right">
      {/* <Row className="justify-content-center">
        <Col sm="6" className="text-center">
          <Card body>
            <CardTitle tag="h5">
              <div className="topbar-content topbar-content-1 bg-071327">
                <p style={{ color: 'white' }}>تحميل شهادة صحة البيانات</p>
              </div>
            </CardTitle>
            <CardText>
              <button
                disabled={parent.status !== 'accept'}
                className={parent.status === 'accept' ? 'default-button' : ''}
                onClick={() => handelDownload(parent)}
              >
                تحميل الشهادة
              </button>
            </CardText>
          </Card>
        </Col>
      </Row> */}

      <Row>
        <Col sm="12" md="6" style={{ height: '25em' }}>
          <Card body style={{ height: '25em', overflow: 'auto' }}>
            <CardTitle tag="h5">
              <div className="topbar-content topbar-content-1 bg-071327">
                <p style={{ color: 'white' }}>بيانات المزرعه</p>
              </div>
            </CardTitle>
            <ListGroup style={{ fontSize: '1rem', paddingInlineStart: '0' }}>
              <ListGroupItem>
                <span> اسم المزرعة / </span>
                <span>{parent.farm?.name}</span>
              </ListGroupItem>

              <ListGroupItem>
                <span> مالك المزرعة/ </span>
                <span>{parent?.farm?.owner}</span>
              </ListGroupItem>
              <ListGroupItem>
                <span> رقم تلفون / </span>
                <span>{parent?.farm?.phone}</span>
              </ListGroupItem>
              <ListGroupItem>
                <span> الموقع / </span>
                <span>
                  <Badge color="dark">{parent.governorate?.name_ar}</Badge> /
                  <Badge color="danger">{parent.center?.name_ar}</Badge> /
                  <Badge color="primary">{parent.hamlet?.name_ar}</Badge>
                </span>
              </ListGroupItem>
              <ListGroupItem>
                <span> اقرب علامه مميزه / </span>
                <span>{parent?.farm?.location?.address?.full}</span>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>

        <Col sm="12" md="6" style={{ height: '25em' }}>
          <Card body style={{ height: '25em', overflow: 'auto' }}>
            <CardTitle tag="h5">
              <div className="topbar-content topbar-content-1 bg-071327">
                <p style={{ color: 'white' }}>
                  <span> بيانات المحصول</span>
                  <span> / {parent?.cropDetails?.name_ar}</span>
                </p>
              </div>
            </CardTitle>
            <Table hover>
              <thead>
                <tr>
                  <th>الصنف</th>
                  <th>المساحة</th>
                  <th>عدد الاحواش</th>
                  <th>الكمية المتوقعه</th>
                  <th>تاريخ القطف</th>
                </tr>
              </thead>
              <tbody style={{ height: '12.5em' }}>
                {parent?.varieties?.map((variety, index) => (
                  <tr key={index}>
                    <td>{variety.name}</td>
                    <td>
                      {variety.area.value} / {variety.area.unit}
                    </td>
                    <td>{variety.parts}</td>
                    <td>
                      {variety.quantity.value} / {variety.quantity.unit}
                    </td>
                    <td>
                      من {variety.picking.from} إلي {variety.picking.to}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>

      {/* <Row className="mt-3">
        <Col sm="12" md="12">
          {parent.gpx?.length > 0 && (
            <Map
              gpx={parent?.gpx}
              owner={parent?.farm?.owner}
              gov={parent?.governorate?.name_ar}
              totalArea={parent?.totalArea}
            />
          )}
        </Col>
      </Row> */}
    </Container>
  );
};

export default Details;
