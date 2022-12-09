import React, { useContext, useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import { Field, Formik } from "formik";
import axios from "services/axios.inercept";
// reactstrap components
import { Button, FormGroup, Form, Input } from "reactstrap";
import { useNavigate } from "react-router";
import validate from "../../../utils/validationUtils/validation";
import OptCode from "./components/OptCode";
import { UserContext, actions } from "contexts/user";

function LoginForm() {
  console.log("login page");
  const [state, dispatch] = useContext(UserContext);

  const OTP_TOKEN = "TakweedFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ";
  const [otpChecked, setOtpChecked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [checkCode, setCheckCode] = useState("");

  React.useEffect(() => {
    // console.log(actions.SET_AUTH);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("_r");
    dispatch({ type: actions.SET_AUTH });
  }, []);

  let navigate = useNavigate();

  const handleLoginSubmitForm = (values, { setSubmitting }) => {
    setSubmitting(true);
    if (isNaN(values.email)) {
      axios
        .post(`/auth/login/admin/`, values, {
          headers: {
            otptoken: OTP_TOKEN,
          },
        })
        .then((response) => {
          setSubmitting(false);
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("user", response.data.data.name);
          localStorage.setItem("_r", "324FC5612ce4E");
          toast.success("تسجيل عمليه الدخول بنجاح");
          dispatch({
            type: actions.SET_AUTH,
            payload: response.data.data.role,
          });
          // history.push("/");
          navigate("/");
        })
        .catch((e) => {
          setSubmitting(false);
          toast.error("خطا ...");
        });
    } else {
      values = {
        phone: "+2" + values.email,
        password: values.password,
      };
      axios
        .post(`/auth/login/`, values, {
          headers: {
            otptoken: OTP_TOKEN,
          },
        })
        .then((response) => {
          // console.log(response);
          setSubmitting(false);
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("user", response.data.data.name);
          localStorage.setItem("info", JSON.stringify(response.data.data));
          localStorage.setItem("_r", "954VC58412cH1M");
          // console.log('loged in');
          dispatch({
            type: actions.SET_AUTH,
            payload: response.data.data.role,
          });
          toast.success("تسجيل عمليه الدخول بنجاح");
          navigate("/client");
          // history.push("/client");
        })
        .catch((e) => {
          setSubmitting(false);
          toast.error("خطا ...");
        });
    }
  };

  const handleRegisterSubmitForm = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    // console.log(values);
    if (values.picked === "a") {
      values.nationalId = values.number;
    }
    if (values.picked === "b") {
      values.tradeId = values.number;
    }
    values.phone = "+2" + values.phone;
    axios
      .post(`/auth/signup/`, values, {
        headers: {
          otptoken: OTP_TOKEN,
        },
      })
      .then((response) => {
        setSubmitting(false);
        resetForm();
        if (response.code !== 201) {
          setPhoneNumber(response.data.phone);
          setCheckCode(response.data.checkCode);
          setOtpChecked(true);
          toast.success("OTP sent to " + response.data.phone);
        } else {
          toast.error("خطا ...");
        }
      })
      .catch((e) => {
        setSubmitting(false);
        toast.error("خطا ...");
      });
  };

  // const handleOTPVerfyForm = (values, { setSubmitting }) => {
  //   setSubmitting(true);
  //   console.log(values);
  //   values.checkCode = checkCode;
  //   values.phone = phoneNumber;
  //   axios
  //     .post(`/auth/verify/`, values, {
  //       headers: {
  //         otptoken: OTP_TOKEN,
  //       },
  //     })
  //     .then((response) => {
  //       localStorage.setItem('token', response.data.accessToken);
  //       localStorage.setItem('user', response.data.data.name);
  //       localStorage.setItem('info', JSON.stringify(response.data.data));
  //       localStorage.setItem('_r', '954VC58412cH1M');
  //       toast.success('تسجيل عمليه الدخول بنجاح');
  //       history.push('/client');
  //     })
  //     .catch((e) => {
  //       setSubmitting(false);
  //       toast.error('خطا ... ');
  //     });
  // };

  const renderResitrationSection = () => {
    if (!otpChecked) {
      return (
        <>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="default-section-title pt-30">
              <h3>حساب جديد</h3>
            </div>
            <div className="login-form">
              <Formik
                initialValues={{
                  name: "",
                  phone: "",
                  email: "",
                  password: "",
                  picked: "",
                  number: "",
                }}
                validate={(values) => {
                  const errors = {};
                  //mail errors
                  if (!values.email) {
                    errors.email = "مطلوب";
                  } else if (!validate.isEmailValide(values.email)) {
                    errors.email = "من فضلك ادخل بريد الكتروني صحيح";
                  }
                  //password errors
                  if (!values.password) {
                    errors.password = "مطلوب";
                  } else if (values.password.length < 6) {
                    errors.password = "كلمه المرور  6 حروف او اراقام";
                  }
                  //name errors
                  if (!values.name) {
                    errors.name = "مطلوب";
                  } else if (!validate.isNameValide(values.name)) {
                    errors.name = "من فضلك ادخل الاسم كامل صحيح";
                  }
                  //phone errors
                  if (!values.phone) {
                    errors.phone = "مطلوب";
                  } else if (!validate.isMobileValide(values.phone)) {
                    errors.phone = "من فضلك ادخل رقم الموبيل الصحيح";
                  }
                  //number errors
                  if (!values.number) {
                    errors.number = "مطلوب";
                  } else if (!validate.isNationalIdValide(values.number) && values.picked === "a") {
                    errors.number = "من فضلك ادخل الرقم القومي الصحيح";
                  } else if (!validate.isTradeIdValide(values.number) && values.picked === "b") {
                    errors.number = "من فضلك ادخل رقم السجل التجاري الصحيح";
                  }

                  return errors;
                }}
                onSubmit={handleRegisterSubmitForm}
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
                        placeholder="الاسم كاملا"
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
                        placeholder="رقم التليفون"
                        name="phone"
                        type="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <span className="text-danger">
                        {errors.phone && touched.phone && errors.phone}
                      </span>
                    </FormGroup>
                    <FormGroup>
                      <Input
                        bsSize="lg"
                        placeholder="البريد الإليكتروني"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <span className="text-danger">
                        {errors.email && touched.email && errors.email}
                      </span>
                    </FormGroup>
                    <FormGroup>
                      <Input
                        placeholder="كلمة المرور"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <span className="text-danger">
                        {" "}
                        {errors.password && touched.password && errors.password}
                      </span>
                    </FormGroup>

                    <FormGroup>
                      <div role="group" aria-labelledby="my-radio-group">
                        <label style={{ marginLeft: "1.6em" }}>
                          للافراد
                          <Field
                            type="radio"
                            name="picked"
                            value="a"
                            style={{ marginRight: "0.2em" }}
                          />
                        </label>
                        <label>
                          للشركات
                          <Field
                            type="radio"
                            name="picked"
                            value="b"
                            style={{ marginRight: "0.2em" }}
                          />
                        </label>
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <Input
                        bsSize="lg"
                        placeholder={values.picked === "a" ? "الرقم القومي" : "رقم السجل التجاري"}
                        name="number"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <span className="text-danger">
                        {" "}
                        {errors.number && touched.number && errors.number}
                      </span>
                    </FormGroup>

                    <Button className="default-button" type="submit" disabled={isSubmitting}>
                      فتح حساب جديد ..
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <OptCode checkCode={checkCode} phoneNumber={phoneNumber} OTP_TOKEN={OTP_TOKEN} />
        </>
      );
    }
  };

  return (
    <>
      <Toaster position="bottom-center" />
      <div className="login ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="default-section-title">
                <h3>تسجيل الدخول </h3>
              </div>
              <div className="login-form pr-20">
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validate={(values) => {
                    const errors = {};

                    if (!values.email) {
                      errors.email = "مطلوب";
                    } else if (!validate.isEmailValide(values.email)) {
                      if (!validate.isMobileValide(values.email)) {
                        errors.email = "من فضلك ادخل الرقم او البريد الصحيح";
                      }
                    }

                    if (!values.password) {
                      errors.password = "مطلوب";
                    }
                    return errors;
                  }}
                  onSubmit={handleLoginSubmitForm}
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
                          placeholder="رقم التليفون او البريد الإليكتروني"
                          name="email"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <span className="text-danger">
                          {errors.email && touched.email && errors.email}
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <Input
                          placeholder="كلمة المرور"
                          name="password"
                          type="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <span className="text-danger">
                          {" "}
                          {errors.password && touched.password && errors.password}
                        </span>
                      </FormGroup>

                      <Button
                        className="default-button default-button-3"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        تسجيل الدخول ...
                      </Button>
                    </Form>
                  )}
                </Formik>
                <a href="/forget">نسيت كلمه المرور </a>
              </div>
            </div>
            {renderResitrationSection()}
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
