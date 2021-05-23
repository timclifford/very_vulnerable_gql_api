import { useState, Fragment } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useQuery } from "@apollo/react-hooks";
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

const PatientAdd = () => {
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

    const [addPatient, { error }] = useMutation(PATIENT_ADD_MUTATION, {
        variables: {
            name: patient.name,
            age: parseInt(patient.age),
            sex: patient.sex,
            weight: patient.weight,
            recent_heart_events: patient.recent_heart_events == 1 ? true : false,
            current_health_assessment: patient.current_health_assessment,
            diabetes: patient.diabetes == 1 ? true : false,
            crp: patient.crp,
            phone_number: patient.phone_number,
            doctor: patient.doctor ? patient.doctor : doctors && doctors.doctors[0].username
        },
        onCompleted: () => setPatient({ ...patient, mutationComplete: true }),
    });

    const saveToState = (evt) => {
        let value = evt.target.value;
        setPatient({ ...patient, [evt.target.name]: value });
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
          <Card>
            <CardHeader className="text-center">Add patient</CardHeader>
            <CardBody>
              {error && (
                <CardFooter>
                  <Alert style={{ marginBottom: "0" }} color="danger">
                    {error.message}
                  </Alert>
                </CardFooter>
              )}
              {patient.mutationComplete && !error && (
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
                    onChange={saveToState}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    name="age"
                    value={patient.age}
                    onChange={saveToState}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    name="sex"
                    placeholder="Gender"
                    value={patient.sex}
                    onChange={saveToState}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    name="weight"
                    placeholder="Weight"
                    value={patient.weight}
                    onChange={saveToState}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="recent-heart-events">Recent heart events</Label>
                  <Input type="select" name="recent_heart_events" value={patient.recent_heart_events} id="recent-heart-events" onChange={saveToState}>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="current-health-assessment">Current health assessment</Label>
                  <Input type="select" name="current_health_assessment" value={patient.current_health_assessment} id="current-health-assessment" onChange={saveToState}>
                    <option value="LOWRISK">Low-risk</option>
                    <option value="MEDIUMRISK">Medium-risk</option>
                    <option value="HIGHRISK">High-risk</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="diabetes">Diabetes</Label>
                  <Input type="select" name="diabetes" value={patient.diabetes} id="diabetes" onChange={saveToState}>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="crp">CRP Status</Label>
                  <Input type="select" name="crp" id="crp" value={patient.crp} onChange={saveToState}>
                    <option value="NORMAL">Normal</option>
                    <option value="ABNORMAL">Abnormal</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    name="phone_number"
                    placeholder="Phone number"
                    value={patient.phone_number}
                    onChange={saveToState}
                  />
                </FormGroup>
                {loading_doctors && "Loading..."}
                {doctors &&
                  <FormGroup>
                    <Label for="doctor">Doctor</Label>
                    <Input type="select" name="doctor" id="doctor" onChange={saveToState}>
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
        </Col>
      </Row>
    </Layout>
    )
}

export default PatientAdd;
