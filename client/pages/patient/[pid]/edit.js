import { useState, useEffect, useContext, Fragment } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { useRouter } from 'next/router';
import UserContext from "../../../context/UserContext";

import Router from "next/router";
import Layout from "../../../components/Layout/Layout";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "reactstrap";

import PATIENT from "../../../graphql/patient.query";
import DOCTORS from "../../../graphql/doctors.query";
import PRACTICES from "../../../graphql/practices.query";
import UPDATE_PATIENT_MUTATION from "../../../graphql/update-patient.mutation";
import UPDATE_MEDICAL_RECORD_MUTATION from "../../../graphql/update-medical-record.mutation";

const PatientEdit = (props) => {
  const [patient, setPatient] = useState({});
  const router = useRouter();
  const { pid } = router && router.query;

  const { me } = useContext(UserContext);

  const isDoctor = () => {
    const roles = me && me.roles;
    return roles && roles.includes("doctor");
  }

  const isReceptionist = () => {
    const roles = me && me.roles;
    return roles && roles.includes("receptionist");
  }

  const { data, loading: loading_curr_patient, error: error_curr_patient } = useQuery(PATIENT, {
    variables: { _id: pid }
  });

  const { data: doctors, loading: loading_doctors, error: error_doctors } = useQuery(DOCTORS);
  const { data: { practices } = {}, loading: loading_practices, error: error_practices } = useQuery(PRACTICES);

  const [addPatient, { error: updatePatientError }] = useMutation(UPDATE_PATIENT_MUTATION, {
    variables: {
      input: {
        patient: {
          _id: pid
        },
        patch: {
          _id: patient._id,
          name: patient.name,
          address: patient.address,
          practice: patient.practice ? patient.practice.name : practices && practices[0].name,
          phone_number: patient.phone_number,
          doctor: patient.doctor ? patient.doctor : doctors && doctors.doctors[0].username,
        }
      }
    },
    onCompleted: () => setPatient({ ...patient, mutationComplete: true }),
  });
  const [addMedicalRecord, { error: updateMedicalRecordError }] = useMutation(UPDATE_MEDICAL_RECORD_MUTATION, {
    variables: {
      input: {
        patient: {
          _id: pid
        },
        patch: {
          age: patient.medical_record && parseInt(patient.medical_record.age),
          sex: patient.medical_record && patient.medical_record.sex,
          weight: patient.medical_record && patient.medical_record.weight,
          recent_heart_events: patient.medical_record && patient.medical_record.recent_heart_events == 1 ? true : false,
          current_health_assessment: patient.medical_record && patient.medical_record.current_health_assessment,
          diabetes: patient.medical_record && patient.medical_record.diabetes == 1 ? true : false,
          crp: patient.medical_record && patient.medical_record.crp
        }
      }
    },
    onCompleted: () => setPatient({ ...patient, mutationComplete: true }),
  });

  const saveToState = (evt) => {
    let name = evt.target.name;
    let value = evt.target.value;
    let medical_record_fields = ['age', 'weight', 'sex', 'recent_heart_events', 'current_health_assessment', 'diabetes', 'crp'];

    if (medical_record_fields.includes(name)) {
      let curr_medical_records = patient.medical_record;
      setPatient({ ...patient, medical_record: {
        ...curr_medical_records,
        [name]: value
      }});
    }
    else {
      setPatient({ ...patient, [evt.target.name]: value });
    }
  };

  useEffect(() => {
    if (data) {
      setPatient({ ...data.patient })
    }
  }, [data]);

  return (
    <Layout>
      <Row style={{ paddingTop: "20px" }}>
        <Col sm="12" md={{ size: 12, offset: 0 }}>
          <div className="my-2">
            <button
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4  text-sm  border border-gray-400 rounded"
              onClick={() => Router.back()}>Back
            </button>
          </div>
          {isDoctor() &&
            <Card>
              {error_curr_patient &&
                <div>{error_curr_patient.message}</div>
              }
              <CardHeader className="text-center">{`Patient ${pid}`}</CardHeader>
              <CardBody>
                {updateMedicalRecordError && (
                  <CardFooter>
                    <Alert style={{ marginBottom: "0" }} color="danger">
                      <div dangerouslySetInnerHTML={{__html: updatePatientError.message}}></div>
                    </Alert>
                  </CardFooter>
                )}
                {patient.mutationComplete && !updateMedicalRecordError && (
                  <CardFooter>
                    <Alert style={{ marginBottom: "0" }} color="success">
                      Patient successfully updated
                    </Alert>
                  </CardFooter>
                )}
                {patient &&
                  <Form
                    method="post"
                    onSubmit={async (evt) => {
                      evt.preventDefault();
                      setPatient({
                        ...patient
                      });
                      await addMedicalRecord();
                    }}
                  >
                    <FormGroup>
                      <Inputd
                        type="text"
                        name="id"
                        value={patient && patient._id || ''}
                        placeholder="ID"
                        onChange={saveToState}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="text"
                        name="name"
                        disabled={true}
                        value={patient && patient.name || ''}
                        placeholder="Name"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="text"
                        name="age"
                        placeholder="Age"
                        value={patient.medical_record && patient.medical_record.age || ''}
                        onChange={saveToState}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="text"
                        name="sex"
                        placeholder="Gender"
                        value={patient.medical_record && patient.medical_record.sex || ''}
                        onChange={saveToState}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="text"
                        name="weight"
                        placeholder="Weight"
                        value={patient.medical_record && patient.medical_record.weight || ''}
                        onChange={saveToState}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="recent-heart-events">Recent heart events</Label>
                      <Input type="select" name="recent_heart_events" value={patient.medical_record && patient.medical_record.recent_heart_events || ''} id="recent-heart-events" onChange={saveToState}>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="current-health-assessment">Current health assessment</Label>
                      <Input type="select" name="current_health_assessment" value={patient.medical_record && patient.medical_record.current_health_assessment || ''} id="current-health-assessment" onChange={saveToState}>
                        <option value="LOWRISK">Low-risk</option>
                        <option value="MEDIUMRISK">Medium-risk</option>
                        <option value="HIGHRISK">High-risk</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="diabetes">Diabetes</Label>
                      <Input type="select" name="diabetes" value={patient.medical_record && patient.medical_record.diabetes || ''} id="diabetes" onChange={saveToState}>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="crp">CRP Status</Label>
                      <Input type="select" name="crp" value={patient.medical_record && patient.medical_record.crp || ''} onChange={saveToState}>
                        <option value="NORMAL">Normal</option>
                        <option value="ABNORMAL">Abnormal</option>
                      </Input>
                    </FormGroup>
                    {loading_doctors && "Loading..."}
                    {doctors &&
                      <FormGroup>
                        <Label for="doctor">Doctor</Label>
                        <Input type="select" name="doctor" id="doctor" value={patient.doctor || ''} onChange={saveToState}>
                          {doctors && doctors.doctors.map((doctor, key) => {
                            let value = doctor.username;
                            return <option key={value} value={value}>{value}</option>
                          })}
                        </Input>
                      </FormGroup>
                    }
                    <button
                      className="bg-blue-400 hover:bg-blue-500 text-white w-full font-semi-bold text-sm px-4 py-2 rounded"
                      type="submit">
                      Save
                    </button>
                  </Form>
                }
              </CardBody>
            </Card>
          }
          {isReceptionist() &&
            <Card>
              {error_curr_patient &&
                <div>{error_curr_patient.message}</div>
              }
              <CardHeader className="text-center">{`Patient ${pid}`}</CardHeader>
              <CardBody>
                {updatePatientError && (
                  <CardFooter>
                    <Alert style={{ marginBottom: "0" }} color="danger">
                      <div dangerouslySetInnerHTML={{__html: updatePatientError.message}}></div>
                    </Alert>
                  </CardFooter>
                )}
                {patient.mutationComplete && !updatePatientError && (
                  <CardFooter>
                    <Alert style={{ marginBottom: "0" }} color="success">
                      Patient successfully updated
                    </Alert>
                  </CardFooter>
                )}
                {patient &&
                  <Form
                    method="post"
                    onSubmit={async (evt) => {
                      evt.preventDefault();
                      setPatient({
                        ...patient
                      });
                      await addPatient();
                    }}
                  >
                    <FormGroup>
                      <Input
                        type="text"
                        name="_id"
                        value={patient && patient._id || ''}
                        placeholder="ID"
                        onChange={saveToState}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="text"
                        name="name"
                        value={patient && patient.name || ''}
                        placeholder="Name"
                        onChange={saveToState}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="text"
                        name="address"
                        value={patient && patient.address || ''}
                        placeholder="Address"
                        onChange={saveToState}
                      />
                    </FormGroup>
                    {loading_practices && "Loading..."}
                    {practices &&
                      <FormGroup>
                        <Label for="practice">Practice</Label>
                        <Input type="select" name="practice" id="practice" value={patient.practice && patient.practice.name || ''} onChange={saveToState}>
                          {practices && practices.map((practice, key) => {
                            let value = practice.name;
                            return <option key={value} value={value}>{value}</option>
                          })}
                        </Input>
                      </FormGroup>
                    }
                    <FormGroup>
                      <Input
                        type="text"
                        name="phone_number"
                        placeholder="Phone number"
                        value={patient.phone_number || ''}
                        onChange={saveToState}
                      />
                    </FormGroup>
                    {loading_doctors && "Loading..."}
                    <FormGroup>
                      <Label for="doctor">Doctor</Label>
                      <Input type="select" name="doctor" id="doctor" value={patient.doctor || ''} onChange={saveToState}>
                        {doctors && doctors.doctors.map((doctor, key) => {
                          let value = doctor.username;
                          return <option key={value} value={value}>{value}</option>
                        })}
                      </Input>
                    </FormGroup>
                    <button
                      className="bg-blue-400 hover:bg-blue-500 text-white w-full font-semi-bold text-sm px-4 py-2 rounded"
                      type="submit">
                      Save
                    </button>
                  </Form>
                }
              </CardBody>
            </Card>
          }
        </Col>
      </Row>
    </Layout>
  )
}

export default PatientEdit;
