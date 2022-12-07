import React, { useContext, useEffect, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import { Field, FieldArray, Formik, ErrorMessage } from 'formik';
import axios from 'services/axios.inercept';
// reactstrap components
import { Button, FormGroup, Form, Input, Row, Label } from 'reactstrap';
import { useHistory } from 'react-router';
import styles from './style.module.css';
import * as yup from 'yup';
import { UserContext, actions } from 'contexts/user';

const varityObj = {
  name: null,
  parts: null,
  area: {
    value: null,
    unit: 'فدان',
  },
  quantity: {
    value: null,
    unit: 'طن',
  },
  picking: {
    from: null,
    to: null,
  },
};
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

function AddForm() {
  const [state, dispatch] = useContext(UserContext);
  // console.log(state);
  const validationSchema = yup.object().shape({
    id: yup
      .mixed()
      .required('يجب ادخال صورة البطاقة')
      .test(
        'fileFormat',
        'يجب ادخال الصورة بصيغة jpg او jpeg او png',
        (value) => {
          return value ? SUPPORTED_FORMATS.includes(value.type) : true;
        }
      ),
    agricultureAssociation: yup
      .mixed()
      .notRequired()
      .test(
        'fileFormat',
        'يجب ادخال الصورة بصيغة jpg او jpeg او png',
        (value) => {
          return value ? SUPPORTED_FORMATS.includes(value.type) : true;
        }
      ),
    possession: yup
      .mixed()
      .notRequired()
      .test(
        'fileFormat',
        'يجب ادخال الصورة بصيغة jpg او jpeg او png',
        (value) => (value ? SUPPORTED_FORMATS.includes(value.type) : true)
      ),
    ownership: yup
      .mixed()
      .notRequired()
      .test(
        'fileFormat',
        'يجب ادخال الصورة بصيغة jpg او jpeg او png',
        (value) => (value ? SUPPORTED_FORMATS.includes(value.type) : true)
      ),
    otherImg: yup
      .mixed()
      .notRequired()
      .test(
        'fileFormat',
        'يجب ادخال الصورة بصيغة jpg او jpeg او png',
        (value) => (value ? SUPPORTED_FORMATS.includes(value.type) : true)
      ),
  });

  const history = useHistory();

  const [crops, setCrops] = useState([]);
  const [farms, setFarms] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const [err, setErr] = useState(null);
  const [associationImage, setAssociationImage] = useState({
    preview: '',
    data: '',
  });
  const [mandatoryImage, setMandatoryImage] = useState({
    preview: '',
    data: '',
  });
  const [ownershipImage, setOwnershipImage] = useState({
    preview: '',
    data: '',
  });
  const [possessionImage, setPossessionImage] = useState({
    preview: '',
    data: '',
  });
  const [otherImg, setOtherImg] = useState({
    preview: '',
    data: '',
  });

  const handleCropChange = (event) => {
    const cropId = event.target.value;
    if (cropId) {
      setVarieties(crops.find((x) => x._id === cropId).varieties);
    } else {
      setVarieties([]);
    }
  };

  const handleMandatoryChange = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    setMandatoryImage(img);
  };
  const handleAssociationChange = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    setAssociationImage(img);
  };
  const handleOwnershipChange = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    setOwnershipImage(img);
  };
  const handlePossessionChange = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    setPossessionImage(img);
  };
  const handleOtherImgChange = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    setOtherImg(img);
  };

  const handleSubmitForm = (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();

    const imagesArr = [
      { data: values.id, filename: 'id.jpg' },
      {
        data: values.agricultureAssociation,
        filename: 'agricultureAssociation.jpg',
      },
      { data: values.ownership, filename: 'ownership.jpg' },
      { data: values.possession, filename: 'possession.jpg' },
      { data: values.otherImg, filename: 'otherImg.jpg' },
    ];

    formData.append('crop', values.crop);
    formData.append('farm', values.farm);
    formData.append('varieties', JSON.stringify(values.varieties));
    formData.append('quality', JSON.stringify(values.quality));
    // formData.append('code', '123456');
    // formData.append('imagesArr', imagesArr);
    imagesArr.forEach((el) => {
      if (el.data) {
        formData.append('files', el.data, el.filename);
      }
    });
    // values.varieties.forEach((el) => {
    //   if (el) {
    //     formData.append('varieties', el.data);
    //   }
    // });

    // formData.forEach((el) => {
    //   console.log(el);
    // });

    axios
      .post('/client/initial/initialrequest', formData)
      .then((data) => {
        // console.log('response', data.data);
        setSubmitting(false);
        toast.success(
          'شكرا لك تم تقديم طلب تكويد محصولك بنجاح \n\n\n' +
            `
          .. رقم الطلب 
           ${data.data.reqcode}
        `,
          {
            duration: 8000,
          }
        );
        resetForm();
      })
      .catch((e) => {
        toast.error('خطافي الخادم');
        console.error(e);
        console.error(e.response?.data?.message);
      });
  };

  useEffect(() => {
    axios
      .get('/client/master/crops')
      .then((data) => {
        setCrops(data.data.data);
        // console.log(data.data.data[0].varieties);
        const sortedVarities = data.data.data[0].varieties.sort(function (
          a,
          b
        ) {
          return a.name_ar.localeCompare(b.name_ar, ['ar']);
        });
        setVarieties(sortedVarities);
      })
      .catch((e) => toast.error('خطا في الخادم'));

    axios
      .get('/client/farm')
      .then((data) => {
        if (data.data.data.length < 1) {
          toast.error('يرجي تسجيل مزرعتك قبل تكويد المحصول التصديري ', {
            duration: 5000,
          });
          setErr('يجب ادخال مزرعة اولا');
        }
        setFarms(data.data.data);
      })
      .catch((e) => {
        toast.error('خطا في الخادم');
        console.error(e);
        console.error(e.response?.data?.message);
      });
  }, []);

  if (state.role === 'reviewer') {
    return <div>welcome noooooo</div>;
  }

  return (
    <div>
      <Toaster position="bottom-center" />
      {err ? (
        <div className="text-center">
          <p>{err}</p>
          <Button onClick={() => history.push('/client/farms')}>
            ادخال مزرعة
          </Button>
        </div>
      ) : (
        <div className="content">
          <Formik
            initialValues={{
              crop: '',
              farm: '',
              varieties: [varityObj],
              quality: [],
              id: '',
              agricultureAssociation: '',
              possession: '',
              ownership: '',
              otherImg: '',
            }}
            validate={(values) => {
              const errors = {};
              if (!values.farm) {
                errors.farm = 'لم تقم بتعين المزرعة';
              }
              if (values.varieties.length < 1) {
                errors.varieties = 'يجب اضافة اصناف المحصول ';
              }
              return errors;
            }}
            onSubmit={handleSubmitForm}
            validationSchema={validationSchema}
            // validateOnBlur={true}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              /* and other goodies */
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="card">
                  <div className="topbar-content topbar-content-1 bg-071327">
                    <p style={{ color: 'white' }}>بيانات المحصول و المزرعة</p>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <FormGroup>
                        <Input
                          id="crop"
                          name="crop"
                          type="select"
                          onChange={(e) => {
                            handleChange(e);
                            handleCropChange(e);
                          }}
                          onBlur={handleBlur}
                        >
                          <option key={700} value="">
                            ---
                          </option>
                          {crops.map((el, index) => (
                            <option key={index} value={el._id}>
                              تكويد محصول ال{el.name_ar}
                            </option>
                          ))}
                        </Input>
                        <span className="text-danger">
                          {touched.crop && errors.crop}
                        </span>
                      </FormGroup>
                    </div>
                    <div className="col-sm-6">
                      <FormGroup>
                        <Input
                          id="farm"
                          name="farm"
                          type="select"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option key={700} value="">
                            ... اختار المزرعة
                          </option>
                          {farms.map((el, index) => (
                            <option key={index} value={el._id}>
                              {el.name}
                            </option>
                          ))}
                        </Input>
                        <span className="text-danger">
                          {touched.farm && errors.farm}
                        </span>
                      </FormGroup>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="topbar-content topbar-content-1 bg-071327">
                    <p style={{ color: 'white' }}>بيانات الاصناف</p>
                  </div>
                  <br />
                  <FieldArray
                    name="varieties"
                    render={(arrayHelpers) => (
                      <div>
                        {values.varieties.map((item, index) => (
                          <div key={index}>
                            {/** both these conventions do the same */}
                            <FormGroup>
                              <div className="row">
                                <div className="col-sm-2">
                                  <Field
                                    as="select"
                                    required
                                    name={`varieties[${index}].name`}
                                    value={undefined}
                                  >
                                    <option key={700} value="">
                                      ---
                                    </option>
                                    {varieties.map((el, index) => (
                                      <option key={index} value={el.name_ar}>
                                        {el.name_ar}
                                      </option>
                                    ))}
                                  </Field>
                                </div>
                                <div className="col-sm-1">
                                  <Field
                                    placeholder="عدد الاحواش"
                                    required
                                    type="number"
                                    name={`varieties[${index}].parts`}
                                    value={undefined}
                                  />
                                </div>
                                <div className="col-sm-1">
                                  <Field
                                    placeholder="المساحة /فدان"
                                    required
                                    type="number"
                                    name={`varieties[${index}].area.value`}
                                    value={undefined}
                                  />
                                </div>
                                <div className="col-sm-3">
                                  <Field
                                    placeholder="الكمية بالطن"
                                    required
                                    type="number"
                                    name={`varieties[${index}].quantity.value`}
                                    value={undefined}
                                  />
                                </div>
                                <div className="col-sm-2">
                                  <span>تاريخ القطف من</span>
                                  <Field
                                    placeholder="from"
                                    required
                                    type="date"
                                    name={`varieties[${index}].picking.from`}
                                    value={undefined}
                                  />
                                </div>
                                <div className="col-sm-2">
                                  <span>الي</span>
                                  <Field
                                    placeholder="to"
                                    required
                                    type="date"
                                    name={`varieties[${index}].picking.to`}
                                    value={undefined}
                                  />
                                </div>
                                <div className="col-sm-1">
                                  <span
                                    style={{ cursor: 'pointer' }}
                                    className="badge bg-danger"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    X
                                  </span>
                                </div>
                              </div>
                            </FormGroup>
                            <hr />
                          </div>
                        ))}
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => {
                            if (
                              arrayHelpers.form.values.varieties.length <
                              varieties.length
                            ) {
                              arrayHelpers.push(varityObj);
                            } else {
                              alert('لا يوجد اصناف اخري');
                            }
                          }}
                        >
                          اضافة صنف +
                        </button>
                      </div>
                    )}
                  />
                  <span className="text-danger">
                    {touched.varieties && errors.varieties}
                  </span>
                </div>

                {/* pictures */}
                <div className="card">
                  <div className="topbar-content topbar-content-1 bg-071327">
                    <p style={{ color: 'white' }}> ارفاق الصور</p>
                  </div>
                  <br />
                  <Row>
                    <FormGroup className="col-md-6">
                      <Label className={styles.label}>صورة البطاقة</Label>
                      <Input
                        required
                        type="file"
                        name="id"
                        accept="image/png, image/jpg, image/jpeg"
                        id="id"
                        onBlur={handleBlur}
                        onChange={(event) => {
                          // console.log(event.target.files[0]);
                          setFieldValue('id', event.target.files[0]);
                          handleMandatoryChange(event);
                        }}
                      />
                      <ErrorMessage
                        name="id"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                      {mandatoryImage.preview && (
                        <img
                          src={mandatoryImage.preview}
                          width="200"
                          height="200"
                          alt="mandatoryImage"
                        />
                      )}
                    </FormGroup>
                    <FormGroup className="col-md-6">
                      <Label className={styles.label}>
                        افادة الجمعية الزراعية
                      </Label>
                      <Input
                        type="file"
                        name="agricultureAssociation"
                        accept="image/png, image/jpg, image/jpeg"
                        id="agricultureAssociation"
                        onBlur={handleBlur}
                        onChange={(event) => {
                          setFieldValue(
                            'agricultureAssociation',
                            event.target.files[0]
                          );
                          handleAssociationChange(event);
                        }}
                      />
                      <ErrorMessage
                        name="agricultureAssociation"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                      {associationImage.preview && (
                        <img
                          src={associationImage.preview}
                          width="200"
                          height="200"
                          alt="associationImage"
                        />
                      )}
                    </FormGroup>
                  </Row>
                  <Row>
                    <FormGroup className="col-md-6">
                      <Label className={styles.label}>عقد حيازة</Label>
                      <Input
                        type="file"
                        name="possession"
                        id="possession"
                        accept="image/png, image/jpg, image/jpeg"
                        onBlur={handleBlur}
                        onChange={(event) => {
                          setFieldValue('possession', event.target.files[0]);
                          handlePossessionChange(event);
                        }}
                      />
                      <ErrorMessage
                        name="possession"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                      {possessionImage.preview && (
                        <img
                          src={possessionImage.preview}
                          width="200"
                          height="200"
                          alt="possessionImage"
                        />
                      )}
                    </FormGroup>

                    <FormGroup className="col-md-6">
                      <Label className={styles.label}>عقد تمليك او ايجار</Label>
                      <Input
                        type="file"
                        name="ownership"
                        accept="image/png, image/jpg, image/jpeg"
                        id="ownership"
                        onBlur={handleBlur}
                        onChange={(event) => {
                          setFieldValue('ownership', event.target.files[0]);
                          handleOwnershipChange(event);
                        }}
                      />
                      <ErrorMessage
                        name="ownership"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                      {ownershipImage.preview && (
                        <img
                          src={ownershipImage.preview}
                          width="200"
                          height="200"
                          alt="ownershipImage"
                        />
                      )}
                    </FormGroup>
                  </Row>

                  <Row>
                    <FormGroup className="col-md-6">
                      <Label className={styles.label}> اخري</Label>
                      <Input
                        type="file"
                        name="otherImg"
                        accept="image/png, image/jpg, image/jpeg"
                        id="otherImg"
                        onBlur={handleBlur}
                        onChange={(event) => {
                          setFieldValue('otherImg', event.target.files[0]);
                          handleOtherImgChange(event);
                        }}
                      />
                      <ErrorMessage
                        name="otherImg"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />

                      {otherImg.preview && (
                        <img
                          src={otherImg.preview}
                          width="200"
                          height="200"
                          alt="otherImgImage"
                        />
                      )}
                    </FormGroup>
                  </Row>
                </div>

                <Button
                  className="default-button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  تقديم طلب التكويد
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default AddForm;
