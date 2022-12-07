import { Formik } from 'formik';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import axios from 'services/axios.inercept';
import validate from '../../../utils/validationUtils/validation';

function contactPage(props) {
  const OTP_TOKEN = 'TakweedFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ';

  const handleSubmitForm = (values, { setSubmitting, resetForm }) => {
    // console.log(values);
    const data = {
      from: values.email,
      subject: `📝 ${values.name} | ${values.phone}`,
      text: values.message,
    };
    setSubmitting(true);
    axios
      .post(`/auth/send/mail/`, data, {
        headers: {
          otptoken: OTP_TOKEN,
        },
      })
      .then((response) => {
        toast.success(
          'شكرا علي رسالتك ,, سوف يقوم فريقنا بالتواصل معكم قريبا '
        );
        setSubmitting(false);
        resetForm();
      })
      .catch((e) => {
        setSubmitting(false);
        resetForm();
        toast.error('خطا ... ');
      });
  };
  return (
    <>
      <Toaster position="bottom-center" />
      <section className="contact ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="contact-card-area pr-20">
                <div className="default-section-title">
                  <h3>اهلا وسهلا بك</h3>
                  <p>
                    نسعد بتواصلكم دائما برجاء تزويدنا بمعلومات الاتصال وسوف نقوم
                    بالرد علي رسائلكم خلال 24 ساعه
                  </p>
                </div>
                <div className="contact-card">
                  <h4>
                    <i className="fas fa-map-marker-alt"></i> عنوان المكتب:{' '}
                  </h4>
                  <p>
                    <a
                      href="https://goo.gl/maps/yZCFQhBogXJ5n8Jf8"
                      target="_blank"
                      rel="noreferrer"
                    >
                      31 شارع ايران الدقي , الجيزه , مصر
                    </a>
                  </p>
                </div>
                <div className="contact-card">
                  <h4>
                    <i className="fas fa-envelope"></i> البريد الإليكتروني:{' '}
                  </h4>
                  <p>info@mahaseel.net</p>
                </div>
                <div className="contact-card">
                  <h4>
                    <i className="fas fa-phone"></i> تليفون:{' '}
                  </h4>
                  <p>
                    <a href="tel:+201111558999">01111558999</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="contact-page-form-area pt-30">
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = 'مطلوب';
                    } else if (!validate.isEmailValide(values.email)) {
                      errors.email = 'من فضلك ادخل بريد الكتروني صحيح';
                    }

                    if (!values.phone) {
                      errors.phone = 'مطلوب';
                    } else if (!validate.isMobileValide(values.phone)) {
                      errors.phone = 'من فضلك ادخل رقم الموبيل الصحيح';
                    }

                    if (!values.name) {
                      errors.name = 'مطلوب';
                    } else if (!validate.isNameValide(values.name)) {
                      errors.name = 'من فضلك ادخل الاسم كامل صحيح';
                    }

                    if (!values.message) {
                      errors.message = 'مطلوب';
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
                          placeholder="الاسم كاملا"
                          name="name"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                        {errors.name && touched.name && errors.name}
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
                        {errors.email && touched.email && errors.email}
                      </FormGroup>
                      <FormGroup>
                        <Input
                          placeholder="رقم التليفون"
                          name="phone"
                          type="tel"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                        />
                        {errors.phone && touched.phone && errors.phone}
                      </FormGroup>
                      <FormGroup>
                        <Input
                          placeholder="الرسالة ..."
                          name="message"
                          type="textarea"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.message}
                        />
                        {errors.message && touched.message && errors.message}
                      </FormGroup>

                      <Button
                        className="default-button default-button-3"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        أرسال الرسالة
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="google-map">
        <iframe
          title="goolemap"
          className="g-map"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBduM7CHBxgxXpTStvDwkzPFbhl5x403cQ&q=Dokki, Giza Governorate egypt"
        ></iframe>
      </div>
    </>
  );
}

export default contactPage;
