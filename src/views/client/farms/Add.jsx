import React, { useEffect, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import { Formik } from 'formik';
import { Form, FormGroup, Input, Button } from 'reactstrap';

import axios from 'services/axios.inercept';
const AddFarm = ({ handelSubmit }) => {
  const [governorate, setGovernorate] = useState([]);
  const [centers, setCenters] = useState([]);
  const [hamlets, setHamlets] = useState([]);

  const handleSubmitForm = (values, { setSubmitting, resetForm }) => {
    const data = {
      name: values.name,
      owner: values.owner,
      phone: values.phone,
      color: '62645',
      location: {
        governorate: values.governorate,
        center: values.center,
        hamlet: values.hamlet,
        address: {
          address: values.address,
          landmark: values.address,
        },
      },
    };
    axios
      .post(`/client/farm`, data)
      .then((response) => {
        setSubmitting(false);
        toast.success('تم اضافة المزرعة');
        handelSubmit();
      })
      .catch((e) => {
        toast.error('Error');
        console.error(e);
        setSubmitting(false);
      });
  };

  const handleGovChange = (event) => {
    const cropId = event.target.value;
    // console.log(cropId);
    axios.get(`/client/master/locations/${cropId}`).then((data) => {
      setCenters(
        data.data.data
          ?.sort((a, b) => {
            return a.name_ar.localeCompare(b.name_ar);
          })
          ?.map((el, index) => (
            <option key={index} value={el._id}>
              {el.name_ar}
            </option>
          ))
      );
    });
  };
  const handleCenterChange = (event) => {
    const centerId = event.target.value;
    axios
      .get(`/client/master/locations/${centerId}/${centerId}`)
      .then((data) => {
        setHamlets(
          data.data.data
            ?.sort((a, b) => {
              return a.name_ar.localeCompare(b.name_ar);
            })
            ?.map((el, index) => (
              <option key={index} value={el._id}>
                {el.name_ar}
              </option>
            ))
        );
      });
  };

  useEffect(() => {
    axios.get('/client/master/locations').then((data) => {
      setGovernorate(
        data.data.data
          ?.sort((a, b) => {
            return a.name_ar.localeCompare(b.name_ar);
          })
          ?.map((el, index) => (
            <option key={index} value={el._id}>
              {el.name_ar}
            </option>
          ))
      );
    });
  }, []);

  return (
    <>
      <Toaster position="bottom-center" />
      <div className="content">
        <Formik
          initialValues={{
            name: '',
            phone: '',
            owner: '',
            governorate: '',
            center: '',
            hamlet: '',
            address: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = 'مطلوب';
            }

            if (!values.phone) {
              errors.phone = 'مطلوب';
            }

            if (!values.owner) {
              errors.owner = 'مطلوب';
            }

            if (!values.hamlet) {
              errors.hamlet = 'مطلوب';
            }
            if (!values.address) {
              errors.hamlet = 'مطلوب';
            }

            return errors;
          }}
          onSubmit={handleSubmitForm}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Input
                  bsSize="lg"
                  placeholder="اسم المزرعة"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className="text-danger">
                  {errors.name && touched.name && errors.name}
                </span>
              </FormGroup>
              <FormGroup>
                <Input
                  bsSize="lg"
                  placeholder="المالك"
                  name="owner"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className="text-danger">
                  {errors.owner && touched.owner && errors.owner}
                </span>
              </FormGroup>
              <FormGroup>
                <Input
                  bsSize="lg"
                  placeholder="رقم التليفون"
                  name="phone"
                  type="text"
                  pattern="^01[0-2|5]\d{1,8}$"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className="text-danger">
                  {errors.phone && touched.phone && errors.phone}
                </span>
              </FormGroup>
              <FormGroup>
                <Input
                  id="governorate"
                  name="governorate"
                  type="select"
                  onChange={(e) => {
                    handleChange(e);
                    handleGovChange(e);
                  }}
                  onBlur={handleBlur}
                >
                  <option key={700} value="">
                    ... اختار المحافظه
                  </option>
                  {governorate}
                </Input>
                <span className="text-danger">
                  {touched.governorate && errors.governorate}
                </span>
              </FormGroup>
              <FormGroup>
                <Input
                  id="center"
                  name="center"
                  type="select"
                  onChange={(e) => {
                    handleChange(e);
                    handleCenterChange(e);
                  }}
                  onBlur={handleBlur}
                >
                  <option key={700} value="">
                    ... اختار المركز
                  </option>
                  {centers}
                </Input>
                <span className="text-danger">
                  {' '}
                  {touched.center && errors.center}
                </span>
              </FormGroup>
              <FormGroup>
                <Input
                  id="hamlet"
                  name="hamlet"
                  type="select"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option key={700} value="">
                    ... اختار الوحده المحليه
                  </option>
                  {hamlets}
                </Input>
                <span className="text-danger">
                  {touched.hamlet && errors.hamlet}
                </span>
              </FormGroup>

              <FormGroup>
                <Input
                  bsSize="lg"
                  placeholder="اقرب علامه مميزه"
                  name="address"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className="text-danger">
                  {errors.address && touched.address && errors.address}
                </span>
              </FormGroup>
              <Button
                className="default-button"
                type="submit"
                disabled={isSubmitting}
              >
                تسجيل
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddFarm;
