import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'services/axios.inercept';

import { ErrorMessage, Formik } from 'formik';
import styles from './LoanForm.module.css';
import Error from 'utils/error/Error';

const handleSubmitForm = (values, { setSubmitting }) => {
  console.log(values);

  //   axios
  //     .post('/client/loan/' + redirectPost._id, values)
  //     .then((response) => {
  //       toast.success(`تم الارسال بنجاح`);
  //       // console.log(response);
  //       setSubmitting(false);
  //       history.push('/admin/topic');
  //     })
  //     .catch((e) => {
  //       setSubmitting(false);
  //       toast.error('حدث خطا ما');
  //     });
};

function LoanForm() {
  return (
    <>
      <Toaster />
      <div className="content">
        <Formik
          initialValues={{
            amount: '',
          }}
          validate={(values) => {
            const errors = {};

            if (!values.amount) {
              errors.amount = '* مطلوب';
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
                <label htmlFor="amount"> قيمة القرض</label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  className={[styles.amount_input, 'form-control'].join(' ')}
                  id="amount"
                  placeholder="المبلغ المطلوب"
                />
                <ErrorMessage name="amount" component={Error} />
              </FormGroup>
              <Button
                className="default-button"
                type="submit"
                disabled={isSubmitting}
              >
                تقديم طلب القرض
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default LoanForm;
