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

import APPOINTMENT from "../../../graphql/appointment.query";
import DOCTORS from "../../../graphql/doctors.query";
import PRACTICES from "../../../graphql/practices.query";
import UPDATE_APPOINTMENT_MUTATION from "../../../graphql/update-appointment.mutation";

const AppointmentEdit = (props) => {
  const [appointment, setAppointment] = useState({});

  const router = useRouter();
  const { aid } = router && router.query;

  const { me } = useContext(UserContext);

  const isReceptionist = () => {
    const roles = me && me.roles;
    return roles && roles.includes("receptionist");
  }

  const { data: curr_appointment, loading: loading_curr_appointment, error: error_curr_appointment } = useQuery(APPOINTMENT, {
    variables: { _id: aid }
  });

  const { data: doctors, loading: loading_doctors, error: error_doctors } = useQuery(DOCTORS);
  const { data: { practices } = {}, loading: loading_practices, error: error_practices } = useQuery(PRACTICES);

  const [addAppointment, { error: updateAppointmentError }] = useMutation(UPDATE_APPOINTMENT_MUTATION, {
    variables: {
      input: {
        appointment: {
          _id: aid
        },
        patch: {
          date: appointment && appointment.date,
          booked_by: appointment && appointment.booked_by && appointment.booked_by.display_name,
          doctor: appointment.doctor ? appointment.doctor.username : doctors && doctors.doctors[0].username,
        }
      }
    },
    onCompleted: () => setAppointment({ ...appointment, mutationComplete: true }),
  });

  const saveToState = (evt) => {
    let name = evt.target.name;
    let value = evt.target.value;

    if (name === 'date') {
      const newDate = new Date(value);
      if (newDate !== 'Invalid Date') {
        setAppointment({ ...appointment, [name]: value });
      }
      else {
        return;
      }
    }
    else if (name === 'doctor') {
      setAppointment({ ...appointment, doctor: { username: value }})
    }
    else if (name === 'booked_by') {
      setAppointment({ ...appointment, booked_by: { display_name: value }})
    }
    else {
      setAppointment({ ...appointment, [name]: value });
    }
  };

  console.log('appointment', appointment);

  useEffect(() => {
    if (curr_appointment) {
      setAppointment(curr_appointment.appointment);
    }
  }, [curr_appointment]);

  return (
    <Layout>
      <Row style={{ paddingTop: "20px" }}>
        <Col sm="12" md={{ size: 12, offset: 0 }}>
          <div className="my-2">
            <button
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4  text-sm  border border-gray-400 rounded"
              onClick={() => Router.back()}>
                Back
            </button>
          </div>
          {isReceptionist() &&
            <Card>
              {error_curr_appointment &&
                <div>{error_curr_appointment.message}</div>
              }
              <CardHeader className="text-center">{`Appointment ${aid}`}</CardHeader>
              <CardBody>
                {updateAppointmentError && (
                  <CardFooter>
                    <Alert style={{ marginBottom: "0" }} color="danger">
                      {updateAppointmentError.message}
                    </Alert>
                  </CardFooter>
                )}
                {appointment.mutationComplete && !updateAppointmentError && (
                  <CardFooter>
                    <Alert style={{ marginBottom: "0" }} color="success">
                      Appointment successfully updated
                    </Alert>
                  </CardFooter>
                )}
                {appointment &&
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
                        type="datetime"
                        name="date"
                        value={(appointment.date && appointment.date) || ''}
                        placeholder="Date"
                        onChange={saveToState}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="text"
                        name="booked_by"
                        value={(appointment.booked_by && appointment.booked_by.display_name) || ''}
                        placeholder="Booked by"
                        onChange={saveToState}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="text"
                        name="practice"
                        disabled={true}
                        value={(appointment.practice && appointment.practice.name) || ''}
                        placeholder="Practice"
                      />
                    </FormGroup>
                    {loading_doctors && "Loading..."}
                    {doctors &&
                      <FormGroup>
                        <Label for="doctor">Doctor</Label>
                        <Input type="select" name="doctor" id="doctor" value={appointment.doctor && appointment.doctor.username} onChange={saveToState}>
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
        </Col>
      </Row>
    </Layout>
  )
}

export default AppointmentEdit;
