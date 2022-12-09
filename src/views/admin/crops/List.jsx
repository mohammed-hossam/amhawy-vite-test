/*!

*/
import React, { useEffect, useState } from "react";
import { fetchData } from "services/api.service";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Button,
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
} from "reactstrap";
import Varieties from "./Varieties";
import { Link } from "react-router-dom";
function Tables() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [crops, setCrops] = useState([]);
  const toggle = () => setModalOpen(!modalOpen);

  const showVarieties = (data) => {
    setCurrentItem(data);
    setModalOpen((state) => !state);
  };

  useEffect(() => {
    fetchData("/crop", "get")
      .then((response) => response.json())
      .then((data) => {
        setCrops(data.data);
      });
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">{crops.length} عنصر</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="text-right" responsive>
                  <thead>
                    <tr>
                      <th>اسم المحصول</th>
                      <th>crops</th>
                      <th>كود</th>
                      <th>مفعل</th>
                      {/* <th>الاصناف</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {crops
                      .sort((a, b) => {
                        return a.name_ar.localeCompare(b.name_ar);
                      })
                      ?.map((crop, index) => (
                        <tr key={index}>
                          <Link
                            className="linkStyle"
                            to={`/admin/crops/${crop._id}`}
                            state={{
                              crop: crop,
                              cropId: crop._id,
                            }}
                          >
                            <td>{crop.name_ar}</td>
                            <td>{crop.name_en}</td>
                            <td>{crop.code}</td>
                            <td>{crop.active === true ? "نعم" : "لا"}</td>

                            {/* <td style={{ textAlign: 'center' }}>
                              <Button
                                // onClick={() =>
                                //   showVarieties({
                                //     _id: crop._id,
                                //     name_ar: crop.name_ar,
                                //     varieties: crop.varieties,
                                //   })
                                // }
                                color="success"
                              >
                                <i className="nc-icon nc-simple-add" />
                              </Button>
                            </td> */}
                          </Link>
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
        <ModalHeader toggle={toggle}>الاصناف الرئيسية</ModalHeader>
        <ModalBody>
          <Varieties parent={currentItem} />
        </ModalBody>
      </Modal>
    </>
  );
}
export default Tables;
