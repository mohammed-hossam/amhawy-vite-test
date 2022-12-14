import React, { useEffect, useState } from "react";
import { Formik, Form, FieldArray, Field } from "formik";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import axiosApiInstance from "services/axios.inercept";
import styles from "./addRequest.module.css";
import { useNavigate, useLocation } from "react-router";
import FormikComponent from "./FormikComponent";
import axios from "services/axios.inercept";
import { toast, Toaster } from "react-hot-toast";

// import FormikComp from './formikComp';
// import * as Yup from 'yup';
// import toast from 'react-hot-toast';
// import * as ExcelJS from 'exceljs/dist/exceljs.min';

const Edit = () => {
  const [crops, setCrops] = useState([]);
  const [varieties, setVarieties] = useState();
  const [governorates, setGovernorates] = useState([]);
  const [centers, setCenters] = useState([]);
  const [hamlets, setHamlets] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  //   console.log(location.state);

  useEffect(() => {
    axiosApiInstance.get("/client/master/locations").then((data) => {
      // console.log(data);
      setGovernorates(data.data.data);
    });

    handleGovChange();

    handleCenterChange();
  }, []);

  function handleGovChange(event) {
    const govId = event?.target?.value || location.state.governorate;
    // console.log(cropId);
    axiosApiInstance
      .get(`/client/master/locations/${govId}`)
      .then((data) => {
        setCenters(data.data.data);
      })
      .catch((e) => {
        console.log(e);
        console.error(e?.response?.data.message);
      });
  }

  function handleCenterChange(event) {
    //     console.log(location.state.center);
    const centerId = event?.target?.value || location.state.center;
    axiosApiInstance
      .get(`/client/master/locations/${centerId}/${centerId}`)
      .then((data) => {
        setHamlets(data.data.data);
      })
      .catch((e) => {
        console.log(e);
        console.error(e?.response?.data.message);
      });
  }

  function getVarieties() {
    axios
      .get(`/admin/crop/${location.state.cropId}`)
      .then((response) => {
        // console.log(response);
        const sortedVarities = response.data.data.varieties.sort(function (a, b) {
          return a.name_ar.localeCompare(b.name_ar, ["ar"]);
        });
        setVarieties(sortedVarities);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  function getCrops() {
    axiosApiInstance.get("/client/master/crops").then((data) => {
      setCrops(
        data.data.data?.sort(function (a, b) {
          return a.name_ar.localeCompare(b.name_ar, ["ar"]);
        })
      );
    });
  }

  function handleCropChange(e) {
    const cropId = e.target.value;
    if (cropId) {
      setVarieties(
        crops
          .find((x) => x._id === cropId)
          ?.varieties?.sort(function (a, b) {
            return a.name_ar.localeCompare(b.name_ar, ["ar"]);
          })
      );
    } else {
      setVarieties([]);
    }
  }

  useEffect(() => {
    getCrops();
  }, []);

  useEffect(() => {
    getVarieties();
  }, []);

  function handleSubmitForm(values, { setSubmitting, resetForm }) {
    const finalValues = {
      ...values,
      varaities: values.varaities.map((el) => {
        return {
          name: el.name,
          parts: el.parts,
          area: {
            value: el.area,
            unit: "????????",
          },
          quantity: {
            value: el.quantity,
            unit: "????",
          },
          picking: {
            from: el.picking.from,
            to: el.picking.to,
          },
        };
      }),
    };
    //     console.log(finalValues);
    function handleSearch() {
      axiosApiInstance
        .put(`/admin/initial/${location.state.requestId}`, finalValues)
        .then((response) => {
          // console.log(response);
          toast.success("???? ?????????????? ??????????");
          resetForm();
          setSubmitting(false);
          navigate(`/initialRequests/view/${location.state.requestId}`);
          // toggleRegistrationSuccess();
        })
        .catch((e) => {
          setSubmitting(false);
          console.error(e.response?.data.message);
          toast.error("?????? ??????");
        });
    }

    handleSearch();
  }

  return (
    <>
      <Formik
        initialValues={{
          farmName: location.state.farmName,
          ownerName: location.state.ownerName,
          phoneNumber: location.state.phoneNumber,
          crop: location.state.cropId,
          address: location.state.address,
          governorate: location.state.governorate,
          center: location.state.center,
          hamlet: location.state.hamlet,
          varaities: location.state.varaities,
        }}
        onSubmit={handleSubmitForm}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => {
          return (
            <>
              <Form className={[styles.form].join(" ")}>
                <h2 className={[styles.subHeader].join(" ")} style={{ marginBottom: "0.5em" }}>
                  ???????????? ??????????????
                </h2>

                <Row>
                  {/* farmName */}
                  <Col md={4}>
                    <FormGroup>
                      <Label htmlFor="farmName" className={[styles.label].join(" ")}>
                        ?????? ??????????????
                      </Label>
                      <Input
                        id="farmName"
                        className={[styles.input].join(" ")}
                        placeholder="?????? ?????????????? "
                        name="farmName"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.farmName}
                      />
                      <span className="text-danger">
                        {errors.farmName && touched.farmName && errors.farmName}
                      </span>
                    </FormGroup>
                  </Col>
                  {/* ownerName */}
                  <Col md={4}>
                    <FormGroup>
                      <Label htmlFor="ownerName" className={[styles.label].join(" ")}>
                        ???????????? ???? ????????????
                      </Label>
                      <Input
                        id="ownerName"
                        className={[styles.input].join(" ")}
                        placeholder="???????????? ???? ????????????"
                        name="ownerName"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.ownerName}
                      />
                      <span className="text-danger">
                        {errors.ownerName && touched.ownerName && errors.ownerName}
                      </span>
                    </FormGroup>
                  </Col>
                  {/* phoneNumber */}
                  <Col md={4}>
                    <FormGroup>
                      <Label htmlFor="phoneNumber" className={[styles.label].join(" ")}>
                        ?????? ??????????????????
                      </Label>
                      <Input
                        id="phoneNumber"
                        className={[styles.input].join(" ")}
                        placeholder="?????? ??????????????????"
                        name="phoneNumber"
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phoneNumber}
                      />
                      <span className="text-danger">
                        {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                      </span>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  {/* address */}
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="address" className={[styles.label].join(" ")}>
                        ???????? ?????????? ??????????
                      </Label>
                      <Input
                        id="address"
                        className={[styles.input].join(" ")}
                        placeholder="???????? ?????????? ??????????"
                        name="address"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                      />
                      <span className="text-danger">
                        {errors.address && touched.address && errors.address}
                      </span>
                    </FormGroup>
                  </Col>
                  {/* crop */}
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="crop" className={[styles.label].join(" ")}>
                        ??????????????
                      </Label>
                      <Input
                        id="crop"
                        className={[styles.input].join(" ")}
                        placeholder="??????????????"
                        name="crop"
                        type="select"
                        onChange={(e) => {
                          //  console.dir(e.currentTarget);
                          //  console.log(e.target.innerText);
                          //  console.log(
                          //    crops[e.target.options.selectedIndex].name_ar
                          //  );
                          handleChange(e);
                          //  setFieldValue(
                          //    'cropId',
                          //    crops[e.target.options.selectedIndex].name_ar
                          //  );
                          handleCropChange(e);
                        }}
                        onBlur={handleBlur}
                        value={values.crop}
                      >
                        <option key={700} value="">
                          ?????????? ??????????????...
                        </option>
                        {crops?.map((el, index) => (
                          <option key={index} value={el._id}>
                            {el.name_ar}
                          </option>
                        ))}
                      </Input>

                      <span className="text-danger">
                        {errors.crop && touched.crop && errors.crop}
                      </span>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  {/* governorate */}
                  <Col md={4}>
                    <FormGroup>
                      <Label htmlFor="governorate" className={[styles.label].join(" ")}>
                        ????????????????
                      </Label>
                      <Input
                        id="governorate"
                        className={[styles.input].join(" ")}
                        //     placeholder="????????????????"
                        name="governorate"
                        type="select"
                        onChange={(e) => {
                          handleChange(e);
                          handleGovChange(e);
                        }}
                        onBlur={handleBlur}
                        value={values.governorate}
                      >
                        <option key={700} value="">
                          ?????????? ????????????????...
                        </option>
                        {governorates?.map((el, index) => (
                          <option key={index} value={el._id}>
                            {el.name_ar}
                          </option>
                        ))}
                      </Input>

                      <span className="text-danger">
                        {errors.governorate && touched.governorate && errors.governorate}
                      </span>
                    </FormGroup>
                  </Col>
                  {/* center */}
                  <Col md={4}>
                    <FormGroup>
                      <Label htmlFor="center" className={[styles.label].join(" ")}>
                        ????????????
                      </Label>
                      <Input
                        id="center"
                        className={[styles.input].join(" ")}
                        name="center"
                        type="select"
                        onChange={(e) => {
                          handleChange(e);
                          handleCenterChange(e);
                        }}
                        onBlur={handleBlur}
                        value={values.center}
                      >
                        <option key={700} value="">
                          ?????????? ????????????...
                        </option>
                        {centers?.map((el, index) => (
                          <option key={index} value={el._id}>
                            {el.name_ar}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  {/* hamlet */}
                  <Col md={4}>
                    <FormGroup>
                      <Label htmlFor="hamlet" className={[styles.label].join(" ")}>
                        ???????????? ??????????????
                      </Label>
                      <Input
                        id="hamlet"
                        className={[styles.input].join(" ")}
                        name="hamlet"
                        type="select"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        value={values.hamlet}
                      >
                        <option key={700} value="">
                          ?????????? ????????????...
                        </option>
                        {hamlets?.map((el, index) => (
                          <option key={index} value={el._id}>
                            {el.name_ar}
                          </option>
                        ))}
                      </Input>
                      <span className="text-danger">
                        {errors.hamlet && touched.hamlet && errors.hamlet}
                      </span>
                    </FormGroup>
                  </Col>
                </Row>

                <h2 className={[styles.subHeader].join(" ")} style={{ marginTop: "2em" }}>
                  ???????????? ??????????????
                </h2>

                <FieldArray
                  name="varaities"
                  render={(arrayHelpers) => (
                    <div>
                      {values.varaities.map((item, index) => (
                        <div key={index}>
                          <FormikComponent index={index} crops={varieties} />

                          <hr className={[styles.line].join(" ")} />
                        </div>
                      ))}
                    </div>
                  )}
                />

                {/* submit btn */}
                <Button
                  type="submit"
                  className={[styles.submitBtn].join(" ")}
                  disabled={isSubmitting}
                >
                  ??????????
                </Button>
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default Edit;
