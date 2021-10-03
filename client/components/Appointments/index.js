import { useQuery } from "@apollo/client";
import APPOINTMENTS from "../../graphql/appointments.query";
import Link from "next/link";
import Error from "../Errors";
import { Alert, Row, Col } from "reactstrap";

const Appointments = ({ me }) => {
  if (me && !me.roles.includes("receptionist")) {
    return (
      <Alert style={{ marginTop: "20px" }} color="danger">
        <div>No access to appointments</div>
      </Alert>
    )
  }

  const { data, loading, error } = useQuery(APPOINTMENTS, {
    variables: { practice: me.practice._id }
  });
  const { appointments } = data && data || [];

  if (data && data.appointments.length === 0) {
    return (
      <div className="p-4 m-4">
        <div className="px-2 py-4">
          <div>No appointments</div>
        </div>
      </div>
    );
  }

  if (error) {
    return <Error>Error: {JSON.stringify(error.message)}</Error>;
  }

  const AppointmentLink = ({_id, text = "more"}) => {
    return (
      <Link
        href={'/appointment/'+_id}
        style={{ cursor: "pointer" }}
        className="block leading-tight font-semibold text-gray-800 hover:underline"
      >
        {text}
      </Link>
    )
  };

  return (
    <div className="p-2">
      <div className="px-2 py-4">
        <h2 className="font-bold">Appointments</h2>
      </div>
      {loading && <div className="py-4">Loading...</div>}
      <Row style={{ padding: "20px 0" }}>
        <Col>
          <Link href="/appointment/add">
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 text-sm font-semibold py-2 px-4 border border-gray-400 rounded"
              style={{ cursor: "pointer" }}>
              Add an appointment
            </button>
          </Link>
        </Col>
      </Row>
      {appointments &&
        <table className="table-auto mb-8 w-full">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Patient</th>
              <th className="border px-4 py-2">Doctor</th>
              <th className="border px-4 py-2">Practice</th>
              <th className="border px-4 py-2">Booked by</th>
              <th className="border px-4 py-2"></th>
            </tr>
          </thead>
          {appointments.map(appointment => {
            const date = new Date(appointment.date).toLocaleString();
            return (
              <tbody key={appointment._id}>
                <tr className="text-center">
                  <td className="border px-4 py-2">{date}</td>
                  <td className="border px-4 py-2">{appointment.patient.name}</td>
                  <td className="border px-4 py-2">{appointment.doctor.display_name}</td>
                  <td className="border px-4 py-2">{appointment.practice.name}</td>
                  <td className="border px-4 py-2">{appointment.booked_by.display_name}</td>
                  <td className="border px-4 py-2"><AppointmentLink _id={appointment._id}/></td>
                </tr>
              </tbody>
            )
          })}
        </table>
      }
    </div>
  );
};

export default Appointments;
