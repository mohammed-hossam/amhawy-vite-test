import React from 'react';

import { Field, Formik } from 'formik';
import { Form, FormGroup, Input, Button } from 'reactstrap';
const MessageForm = ({ handelSending }) => {
  const handleSubmitForm = (values, { setSubmitting }) => {
    setSubmitting(true);
    handelSending(values);
  };
  return (
    <>
      <div className="content">
        <Formik
          initialValues={{ title: '', content: '', checked: [] }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = 'مطلوب';
            }
            if (!values.content) {
              errors.content = 'مطلوب';
            }
            if (values.title.length > 128) {
              errors.title = 'الحد الاقصي للعنوان 128';
            }
            if (values.content.length > 255) {
              errors.content = 'الحد الاقصي للرساله 255';
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
                  placeholder=" عنوان الرسالة"
                  name="title"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                {errors.title && touched.title && errors.title}
              </FormGroup>

              <FormGroup>
                <Input
                  placeholder="محتوي الرسالة"
                  name="content"
                  type="textarea"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.content}
                />
                {errors.content && touched.content && errors.content}
              </FormGroup>

              <div role="group" aria-labelledby="checkbox-group">
                <label>
                  <Field type="checkbox" name="checked" value="SMS" />
                  رسالة نصيه
                </label>
                <label>
                  <Field type="checkbox" name="checked" value="NOTIFICATION" />
                  تنبية موبايل
                </label>
                <label>
                  <Field type="checkbox" name="checked" value="EMAIL" />
                  بريد اليكتروني
                </label>
              </div>
              <Button type="submit" color="primary" disabled={isSubmitting}>
                إرسال ..
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default MessageForm;
