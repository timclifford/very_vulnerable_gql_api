import { useState, Fragment, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import UserContext from "../../context/UserContext";
import DOCTORS from "../../graphql/doctors.query";
import Router from "next/router";
import Layout from "../../components/Layout/Layout";
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
import PATIENT_ADD_MUTATION from "../../graphql/add-patient.mutation";
import MEDICAL_RECORD_ADD_MUTATION from "../../graphql/add-medical-record.mutation";

const PatientAdd = () => {
  const { me } = useContext(UserContext);

  const isDoctor = () => {
    const roles = me && me.roles;
    return roles && roles.includes("doctor");
  }

  const isReceptionist = () => {
    const roles = me && me.roles;
    return roles && roles.includes("receptionist");
  }

  const { data: doctors, loading: loading_doctors, error: error_doctors } = useQuery(DOCTORS);
  const [patient, setPatient] = useState({
      name: "",
      age: 0,
      sex: "",
      weight: "",
      recent_heart_events: false,
      current_health_assessment: "LOWRISK",
      diabetes: false,
      crp: "NORMAL",
      phone_number: "",
      doctor: "",
      mutationComplete: false,
  });

  const [medical_record, setMedicalRecord] = useState({
    patient: "",
    age: 0,
    sex: "",
    weight: "",
    recent_heart_events: false,
    current_health_assessment: "LOWRISK",
    diabetes: false,
    crp: "NORMAL",
    mutationComplete: false,
  });

  const [addPatient, { error: error_patient }] = useMutation(PATIENT_ADD_MUTATION, {
    variables: {
      name: patient.name,
      address: patient.address,
      phone_number: patient.phone_number,
      practice: patient.practice,
      doctor: patient.doctor ? patient.doctor : doctors && doctors.doctors[0].username
    },
    onCompleted: () => setPatient({ ...patient, mutationComplete: true }),
  });

  const [addMedicalRecord, { error: error_medical_record }] = useMutation(MEDICAL_RECORD_ADD_MUTATION, {
    variables: {
      patient: medical_record.patient,
      age: parseInt(medical_record.age),
      sex: medical_record.sex,
      weight: medical_record.weight,
      recent_heart_events: medical_record.recent_heart_events == 1 ? true : false,
      current_health_assessment: medical_record.current_health_assessment,
      diabetes: medical_record.diabetes == 1 ? true : false,
      crp: medical_record.crp,
    },
    onCompleted: () => setMedicalRecord({ ...medical_record, mutationComplete: true }),
  });

  const saveToPatientState = (evt) => {
    let value = evt.target.value;
    setPatient({ ...patient, [evt.target.name]: value });
  };

  const saveToMedicalRecordState = (evt) => {
    let value = evt.target.value;
    setMedicalRecord({ ...medical_record, [evt.target.name]: value });
  };

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
              <CardHeader className="text-center">Add medical record</CardHeader>
              <CardBody>
                {error_medical_record && (
                  <CardFooter>
                    <Alert style={{ marginBottom: "0" }} color="danger">
                      {error_medical_record.message}
                    </Alert>
                  </CardFooter>
                )}
                {medical_record.mutationComplete && !error_medical_record && (
                  <CardFooter>
                    <Alert style={{ marginBottom: "0" }} color="success">
                      Medical record successfully added
                    </Alert>
                  </CardFooter>
                )}
                <Form
                  method="post"
                  onSubmit={async (evt) => {
                    evt.preventDefault();
                    setMedicalRecord({
                      ...medical_record
                    });
                    await addMedicalRecord();
                  }}
                >
                  <FormGroup>
                    <Input
                      type="text"
                      name="patient"
                      value={medical_record.patient}
                      placeholder="Patient name"
                      onChange={saveToMedicalRecordState}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      name="age"
                      placeholder="Age"
                      value={medical_record.age}
                      onChange={saveToMedicalRecordState}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      name="sex"
                      placeholder="Gender"
                      value={medical_record.sex}
                      onChange={saveToMedicalRecordState}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      name="weight"
                      placeholder="Weight"
                      value={medical_record.weight}
                      onChange={saveToMedicalRecordState}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="recent-heart-events">Recent heart events</Label>
                    <Input type="select" name="recent_heart_events" value={medical_record.recent_heart_events} id="recent-heart-events" onChange={saveToMedicalRecordState}>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="current-health-assessment">Current health assessment</Label>
                    <Input type="select" name="current_health_assessment" value={medical_record.current_health_assessment} id="current-health-assessment" onChange={saveToMedicalRecordState}>
                      <option value="LOWRISK">Low-risk</option>
                      <option value="MEDIUMRISK">Medium-risk</option>
                      <option value="HIGHRISK">High-risk</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="diabetes">Diabetes</Label>
                    <Input type="select" name="diabetes" value={medical_record.diabetes} id="diabetes" onChange={saveToMedicalRecordState}>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="crp">CRP Status</Label>
                    <Input type="select" name="crp" id="crp" value={medical_record.crp} onChange={saveToMedicalRecordState}>
                      <option value="NORMAL">Normal</option>
                      <option value="ABNORMAL">Abnormal</option>
                    </Input>
                  </FormGroup>
                  }
                  <button
                    className="bg-blue-400 hover:bg-blue-500 text-white w-full font-semi-bold text-sm px-4 py-2 rounded"
                    type="submit">
                    Add record
                  </button>
                </Form>
              </CardBody>
            </Card>
          }
          {isReceptionist() &&
            <Card>
              <CardHeader className="text-center">Add patient</CardHeader>
              <CardBody>
                {error_patient && (
                  <CardFooter>
                    <Alert style={{ marginBottom: "0" }} color="danger">
                      {error_patient.message}
                    </Alert>
                  </CardFooter>
                )}
                {patient.mutationComplete && !error_patient && (
                  <CardFooter>
                    <Alert style={{ marginBottom: "0" }} color="success">
                      Patient successfully added
                    </Alert>
                  </CardFooter>
                )}
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
                      name="name"
                      value={patient.name}
                      placeholder="Name"
                      onChange={saveToPatientState}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={patient.address}
                      onChange={saveToPatientState}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      name="phone_number"
                      placeholder="Phone number"
                      value={patient.phone_number}
                      onChange={saveToPatientState}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      name="practice"
                      placeholder="Practice"
                      value={patient.practice}
                      onChange={saveToPatientState}
                    />
                  </FormGroup>
                  {loading_doctors && "Loading..."}
                  {doctors &&
                    <FormGroup>
                      <Label for="doctor">Doctor</Label>
                      <Input type="select" name="doctor" id="doctor" onChange={saveToPatientState}>
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
                    Add
                  </button>
                </Form>
              </CardBody>
            </Card>
          }
        </Col>
      </Row>
    </Layout>
  )
}

export default PatientAdd;
