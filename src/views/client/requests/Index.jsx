import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import axiosApiInstance from "services/axios.inercept";
import Details from "./Details";

function Index(props) {
  const history = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const toggle = () => setModalOpen(!modalOpen);
  const [data, setData] = useState([]);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const printStatus = (status) => {
    if (status === "inprogress") return "تحت المراجعة";
    if (status === "accept") return "تم اصدار الشهادة";
    if (status === "reject") return "رفض الطلب";
    return "";
  };

  const handelDeleteBtn = (id) => {
    if (window.confirm(" تاكيد حذف الطلب ؟") === true) {
      axiosApiInstance
        .delete("/client/request/" + id)
        .then((response) => {
          toast.success("تم حذف الطلب بنجاح");
          axiosApiInstance
            .get("/client/request")
            .then((response) => {
              if (response.data.length > 0) {
                setLoading(false);
                setData(response.data.data);
              }
            })
            .catch((e) => toast.error("خطا في الخادم"));
        })
        .catch((e) => toast.error("خطا في الخادم"));
    }
  };

  useEffect(() => {
    axiosApiInstance
      .get("/client/request")
      .then((response) => {
        // console.log(response);
        if (response.data.length > 0) {
          setLoading(false);
          setData(response.data.data);
        } else {
          setLoading(false);
          setErr("يجب ادخال محصول اولا");
        }
      })
      .catch((e) => {
        setLoading(false);
        console.error(e);
      });
  }, []);

  return (
    <div>
      {loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      )}

      {loading === false && err && (
        <div className="text-center">
          <p>{err}</p>

          <Button onClick={() => history.push("/client/code")}>ادخال محصول</Button>
        </div>
      )}

      <Toaster position="bottom-center" />
      {loading === false && !err && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">كود الطلب</th>
              <th scope="col">المزرعه</th>
              <th scope="col">المحصول</th>
              <th scope="col">تاريخ الطلب</th>
              <th scope="col">حالة الطلب</th>
              <th scope="col">حذف</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((request, index) => (
              <tr style={{ cursor: "pointer" }} key={index + 1}>
                <th scope="row">{index + 1}</th>
                <td
                  onClick={() => {
                    setItem(request);
                    setModalOpen((state) => !state);
                  }}
                >
                  {request.code}
                </td>
                <td
                  onClick={() => {
                    setItem(request);
                    setModalOpen((state) => !state);
                  }}
                >
                  {request.farm.name}
                </td>
                <td
                  onClick={() => {
                    setItem(request);
                    setModalOpen((state) => !state);
                  }}
                >
                  {request.cropDetails.name_ar}
                </td>
                <td
                  onClick={() => {
                    setItem(request);
                    setModalOpen((state) => !state);
                  }}
                >
                  {request.createdAt.substring(0, 10)}
                </td>
                <td
                  onClick={() => {
                    setItem(request);
                    setModalOpen((state) => !state);
                  }}
                >
                  {printStatus(request.status)}
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handelDeleteBtn(request._id)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        className="custom-map-modal modal-lg"
        style={{ width: "fit-content", maxWidth: "1200px" }}
        aria-labelledby="contained-modal-title-vcenter"
        isOpen={modalOpen}
        toggle={toggle}
        fade={false}
      >
        <ModalHeader toggle={toggle}>تفاصيل الطلب / {item.code}</ModalHeader>
        <ModalBody className="show-grid">
          <Details parent={item} key={item._id} />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Index;
