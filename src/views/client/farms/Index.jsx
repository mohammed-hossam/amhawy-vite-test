import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader, Spinner } from 'reactstrap';
import axiosApiInstance from 'services/axios.inercept';
import AddFarm from './Add';

function Index(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const toggle = () => setModalOpen(!modalOpen);

  const handelSubmit = (values) => {
    toggle();
    setLoading(true);
    axiosApiInstance
      .get('/client/farm')
      .then((response) => {
        if (response.data.length > 0) {
          setLoading(false);
          setData(response.data.data);
        }
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    axiosApiInstance
      .get('/client/farm')
      .then((response) => {
        if (response.data.length > 0) {
          setLoading(false);
          setData(response.data.data);
        } else {
          setLoading(false);
        }
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div>
      {loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      )}
      <button
        className="btn btn-success"
        onClick={() => setModalOpen((state) => !state)}
      >
        {'اضف مزرعة  '}
        <i className="fas fa-plus mr-2"></i>
      </button>
      {loading === false && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">كود</th>
              <th scope="col">المزرعه</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((request, index) => (
              <tr style={{ cursor: 'pointer' }} key={index + 1}>
                <th scope="row">{index + 1}</th>
                <td>{request._id}</td>
                <td>{request.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal isOpen={modalOpen} toggle={toggle} fade={false}>
        <ModalHeader toggle={toggle}>تسجيل بيانات مزرعة</ModalHeader>
        <ModalBody>
          <AddFarm handelSubmit={handelSubmit} />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Index;
