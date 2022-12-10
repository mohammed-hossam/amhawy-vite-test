import React from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MessageForm from "./MessageForm";

import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "services/axios.inercept";
function View() {
  let { id } = useParams();
  const [user, setUser] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const toggle = () => setModalOpen(!modalOpen);

  useEffect(() => {
    axios.get("/admin/user/" + id).then((data) => setUser(data.data));
    // console.log(user);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(user);
  let navigate = useNavigate();

  function viewItem(id) {
    navigate(`/requests/view/${id}`);
  }

  const handelSending = (values) => {
    // console.log(values);
    axios
      .post(`/admin/user/${id}/message`, values)
      .then((response) => {
        toast.success(`تم ارسال الرساله بنجاح`);
        toggle();
      })
      .catch((e) => {
        toast.success(`Error`);
        console.error(e);
      });
  };

  return (
    <>
      <Toaster />
      <div className="content">
        <Row>
          <Col md="3">
            <Card className="card-user">
              <div className="image">
                <img alt="bg-header" src="/assets/images/admin-users/header.jpg" />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={toggle}>
                    <img
                      alt="avatar"
                      className="avatar border-gray"
                      src="/assets/images/admin-users/default-avatar.png"
                    />
                    <h6 className="title">{user?.data?.name}</h6>
                  </a>
                  <p className="description">{user?.data?.phone.substring(2, 13)}</p>
                  <p className="description">{user?.data?.email}</p>
                  <p className="description">{user?.data?.nationalId}</p>
                  <p className="description">{user?.data?.tradeId}</p>
                  <p className="description">{user?.data?.updatedAt}</p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle tag="h4">الرسائل والتنبيهات</CardTitle>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled team-members">
                  {user?.messages?.map((message, index) => (
                    <li>
                      <Row>
                        <Col md="9">
                          {message?.title} <br />
                          <span className="text-muted">
                            <small> {message?.content?.substring(1, 40)}</small>
                          </span>
                        </Col>
                        <Col className="text-right" md="3" xs="3">
                          <Button
                            onClick={toggle}
                            className="btn-round btn-icon"
                            color="success"
                            outline
                            size="sm"
                          >
                            <i className="fa fa-envelope" />
                          </Button>
                        </Col>
                      </Row>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </Col>

          <Col md="9">
            <Card className="card-user text-right">
              <CardHeader>
                <CardTitle tag="h5">المزارع المكودة</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="text-right" responsive>
                  <thead className="text-success">
                    <tr>
                      <th>العلامة</th>
                      <th> اسم المزرعة</th>
                      <th> المالك</th>
                      <th> التيليفون</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user?.farms?.map((farm, index) => (
                      <tr>
                        <td>{farm.location.address.landmark}</td>
                        <td>{farm.name}</td>
                        <td>{farm.owner}</td>
                        <td>{farm.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>

            <Card className="card-user text-right">
              <CardHeader>
                <CardTitle tag="h5">طلبات التكويد</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="text-right" responsive>
                  <thead className="text-success">
                    <tr>
                      <th>كود الطلب</th>
                      <th>حاله الطلب</th>
                      <th> اسم المزرعة</th>
                      <th> المالك</th>
                      <th> العنوان</th>
                      <th> تارخ الطلب</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user?.requests?.map((req, index) => (
                      <tr style={{ cursor: "pointer" }} onClick={() => viewItem(req._id)}>
                        <td>
                          {req?.cancelled === true && (
                            <span className="text-danger">
                              {" "}
                              <i className="far fa-times-circle" />{" "}
                            </span>
                          )}
                          {req.code}
                        </td>
                        <td className={"text-" + (req.status === "accept" ? "success" : "danger")}>
                          {req.status}
                        </td>
                        <td>{req.farm.name}</td>
                        <td>{req.farm.owner}</td>
                        <td>{req.farm.location.address.full}</td>
                        <td>{req.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal isOpen={modalOpen} toggle={toggle} fade={false}>
        <ModalHeader toggle={toggle}>
          {"إرسال رساله شخصيه الي المستخدم "}
          {user?.data?.name}
        </ModalHeader>
        <ModalBody>
          <MessageForm handelSending={handelSending} />
        </ModalBody>
      </Modal>
    </>
  );
}

export default View;
