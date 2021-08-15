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
import APPOINTMENT_ADD_MUTATION from "../../graphql/add-appointment.mutation";

const AppointmentAdd = () => {
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
  const [appointment, setAppointment] = useState({
      patient: "",
      date: "",
      booked_by: "",
      doctor: "",
      mutationComplete: false,
  });

  const [addAppointment, { error: error_appointment }] = useMutation(APPOINTMENT_ADD_MUTATION, {
    variables: {
      patient: appointment && appointment.patient,
      date: appointment && appointment.date,
      booked_by: appointment && appointment.booked_by,
      doctor: appointment.doctor ? appointment.doctor : doctors && doctors.doctors[0].username
    },
    onCompleted: () => setAppointment({ ...appointment, mutationComplete: true }),
  });

  const saveToState = (evt) => {
    let value = evt.target.value;
    setAppointment({ ...appointment, [evt.target.name]: value });
  };

  console.log(appointment);

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
          {isReceptionist() &&
            <Card>
              <CardHeader className="text-center">Add appointment</CardHeader>
              <CardBody>
                {error_appointment && (
                  <CardFooter>
                    <Alert style={{ marginBottom: "0" }} color="danger">
                      {error_appointment.message}
                    </Alert>
                  </CardFooter>
                )}
                {appointment.mutationComplete && !error_appointment && (
                  <CardFooter>
                    <Alert style={{ marginBottom: "0" }} color="success">
                      Appointment successfully added
                    </Alert>
                  </CardFooter>
                )}
                <Form
                  method="post"
                  onSubmit={async (evt) => {
                    evt.preventDefault();
                    setAppointment({
                      ...appointment
                    });
                    await addAppointment();
                  }}
                >
                  <FormGroup>
                    <Input
                      type="text"
                      name="patient"
                      value={appointment.patient}
                      placeholder="Patient name"
                      onChange={saveToState}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      name="date"
                      placeholder="Date"
                      value={appointment.date}
                      onChange={saveToState}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      name="booked_by"
                      placeholder="Booked by"
                      value={appointment.booked_by}
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
          }
        </Col>
      </Row>
    </Layout>
  )
}

export default AppointmentAdd;
