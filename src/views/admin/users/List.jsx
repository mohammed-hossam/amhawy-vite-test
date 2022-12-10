import React, { useEffect, useState } from "react";
import { fetchData } from "services/api.service";
import { useNavigate } from "react-router-dom";
import Convert from "utils/convert/convert";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
} from "reactstrap";
import SearchUserForm from "./SearchUserForm";
import ToggleButton from "./toggleButton/ToggleButton";
import { Toaster } from "react-hot-toast";

function Tables() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");

  const toggle = () => setModalOpen(!modalOpen);

  const [users, setUsers] = useState([]);
  var [page, setPage] = useState(0);
  // var [downloadExcelLink, setDownloadExcelLink] = useState('');
  let navigate = useNavigate();

  function exportToCSV(filename) {
    // console.log(users);
    let usedUsers = [
      {
        _id: "id",
        name: "الاسم",
        email: "البريد الإليكتروني",
        phone: "رقم التليفون",
        otpVerified: "حالة التاكيد",
        nationalId: "رقم الهويه	",
        createdAt: "تاريخ التسجيل",
      },
      ...users,
    ];
    // let usedUsers = users;
    let csvContent = new Convert().toCSV(usedUsers);

    let URL = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURIComponent(csvContent);

    // arr = [{ bnd: "Brand name", prd: "product name", skus: "count of skus" }, ...arr]

    // const dataFileType = 'application/vnd.ms-excel';
    // const dataFileType =
    // 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64';
    // const dataFileType =
    //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    // const dataFileType =
    //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8';

    // const dataFileType =
    //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    // const tableSelect = document.getElementById(tableID);
    // console.log(tableRef.current);
    // let tableHTMLData = tableRef.current.outerHTML;
    // console.log(tableHTMLData);
    // let tableHTMLData = tableRef.current;
    // let tableHTMLData = encodeURIComponent(tableRef.current.outerHTML);
    // let tableHTMLData = tableRef.current.outerHTML;
    let fileName = `${filename}.csv`;
    // Create download link element
    let downloadLink = document.createElement("a");

    if (downloadLink.download !== undefined) {
      // feature detection
      downloadLink.href = URL;
      downloadLink.setAttribute("download", fileName);
      downloadLink.click();
    } else {
      window.open(URL);
    }
    // document.body.appendChild(downloadLink);
    // function s2ab(s) {
    //   var buf = new ArrayBuffer(s.length);
    //   var view = new Uint8Array(buf);
    //   for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    //   return buf;
    // }
    // if (navigator.msSaveOrOpenBlob) {
    // const blob = new Blob([s2ab(tableHTMLData)], {
    //   type: dataFileType,
    // });
    // const blob = new Blob([tableHTMLData], {
    //   type: dataFileType,
    // });
    // const blob = new Blob(['\ufeff', tableHTMLData], {
    //   type: dataFileType,
    // });
    //   navigator.msSaveOrOpenBlob(blob, fileName);
    // } else {
    // Create a link to the file
    // downloadLink.href = 'data:' + dataFileType + ', ' + tableHTMLData;

    // downloadLink.href = 'data:' + dataFileType + ',' + x;

    // Setting the file name
    // downloadLink.download = filename;
    // const blob = new Blob(['\ufeff', tableHTMLData], {
    //   type: dataFileType,
    // });
    // const objectURL = URL.createObjectURL(blob);

    // console.log(downloadLink);
    // console.log(downloadLink.download);
    //triggering the function
    // downloadLink.click();
    // setDownloadExcelLink(downloadLink);
    // }
  }

  function load(page = 1, query = currentQuery) {
    return fetchData("/user" + query, "get", null, {
      sortBy: "createdAt",
      sortValue: -1,
      page,
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data);
        setPage(1);
      });
  }

  useEffect(() => {
    load(1).then(() => setPage(1));
  }, []);

  const handelSearch = (values) => {
    let query = "?";
    if (values.name.length > 0) {
      query = query + `name=${values.name}&`;
    }
    if (values.nationalId.length > 0) {
      query = query + `nationalId=${values.nationalId}&`;
    }
    if (values.phone.length > 0) {
      query = query + `phone=${values.phone}&`;
    }
    if (values.otpVerified.length > 0) {
      query = query + `otpVerified=${values.otpVerified}&`;
    }
    toggle();
    load(1, query);
    setCurrentQuery(query);
  };

  const disablNext = () => {
    if (users.length === 0 || users.length < 10) return true;
  };
  const disablLast = () => {
    if (page <= 1) return true;
  };

  const next = () => {
    load(page + 1).then(() => setPage(page + 1));
  };

  const last = () => {
    load(page - 1).then(() => setPage(page - 1));
  };

  function viewItem(id) {
    navigate(`/users/view/${id}`);
  }

  return (
    <>
      <Toaster />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Button onClick={toggle} color="dark" className="float-right">
                  <i className="nc-icon nc-zoom-split" /> - بحث
                </Button>
                <Button
                  onClick={() => {
                    load(1, "");
                    setCurrentQuery("");
                  }}
                  color="info"
                  className="float-right"
                >
                  <i className="nc-icon nc-refresh-69" />
                </Button>
                <Button color="dark" className="float-right">
                  {page}
                </Button>
                <Button
                  color="dark"
                  className="float-right"
                  onClick={() => exportToCSV("المستخدمين")}
                >
                  تنزيل ملف csv
                </Button>
              </CardHeader>
              <CardBody>
                {/* <div className="table-responsive">
                  <table className="text-right table">
                    <thead>
                      <tr>
                        <th>الاسم</th>
                        <th>رقم التليفون</th>
                        <th>البريد الإليكتروني</th>
                        <th>رقم الهويه</th>
                        <th>تاريخ التسجيل</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr
                          key={user._id}
                          style={{
                            cursor: 'pointer',
                            color: user.otpVerified ? '' : '#ff0000',
                          }}
                          onClick={() => viewItem(user._id)}
                          // className={
                          //   'text-' + (user.otpVerified ? 'default' : 'warning')
                          // }
                        >
                          <td>{user.name}</td>
                          <td>{user.phone.substring(2, 13)}</td>
                          <td>{user.email}</td>
                          <td>{user.nationalId}</td>
                          <td>{user.createdAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div> */}

                <Table className="text-right" responsive>
                  <thead>
                    <tr>
                      <th>الاسم</th>
                      <th>رقم التليفون</th>
                      <th>البريد الإليكتروني</th>
                      <th>الرقم القومي</th>
                      <th>تاريخ التسجيل</th>
                      <th>حالة الحساب</th>
                      <th>حالة الشهادة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr
                        key={user._id}
                        style={{
                          cursor: "pointer",
                          color: user.otpVerified ? "" : "#ff0000",
                        }}
                        onClick={() => viewItem(user._id)}
                        // className={
                        //   'text-' + (user.otpVerified ? 'default' : 'warning')
                        // }
                      >
                        <td>{user.name}</td>
                        <td>{user.phone.substring(2, 13)}</td>
                        <td>{user.email}</td>
                        <td>{user.nationalId}</td>
                        <td>{user.createdAt.substring(0, 10)}</td>
                        <td>
                          <ToggleButton active={user.otpVerified} id={user._id} type="user" />
                        </td>
                        <td>
                          <ToggleButton active={user.reviewer || null} id={user._id} type="cert" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Button onClick={last} disabled={disablLast()} color="dark">
            السابق
          </Button>
          <Button onClick={next} disabled={disablNext()} color="dark">
            التالي
          </Button>
        </Row>
      </div>

      <Modal isOpen={modalOpen} toggle={toggle} fade={false}>
        <ModalHeader toggle={toggle}>بحث عن المستخدمين</ModalHeader>
        <ModalBody>
          <SearchUserForm handelSearch={handelSearch} />
        </ModalBody>
      </Modal>
    </>
  );
}
export default Tables;
