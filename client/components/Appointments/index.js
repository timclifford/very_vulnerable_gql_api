import { useQuery } from "@apollo/react-hooks";
import APPOINTMENTS from "../../graphql/appointments.query";
import Link from "../Link";
import Error from "../Errors";

const Appointments = () => {
  const { data, loading, error } = useQuery(APPOINTMENTS);
  const { appointments } = data && data || [];

  if (data && data.appointments === null) {
    return (
      <div>No appointments</div>
    );
  }

  if (error) {
    return <Error>Error: {JSON.stringify(error.message)}</Error>;
  }

  // const AppointmentLink = ({_id, text = "more"}) => {
  //   return (
  //     <Link
  //       to={'/appointment/'+_id}
  //       className="block leading-tight font-semibold text-gray-800 hover:underline"
  //     >
  //       {text}
  //     </Link>
  //   )
  // };

  return (
    <div className="p-2">
      <div className="px-2 py-4">
        <h2 className="font-bold">Appointments</h2>
      </div>
      {loading && <div className="py-4">Loading...</div>}
      {appointments &&
        <table className="table-auto mb-8 w-full">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Patient</th>
              <th className="border px-4 py-2">Doctor</th>
              <th className="border px-4 py-2">Practice</th>
              <th className="border px-4 py-2">Booked by</th>
            </tr>
          </thead>
          {appointments.map(appointment => {
            console.log(appointment);
            const date = new Date(appointment.date).toLocaleString();
            return (
              <tbody key={appointment._id}>
                <tr className="text-center">
                  <td className="border px-4 py-2">{date}</td>
                  <td className="border px-4 py-2">{appointment.patient.name}</td>
                  <td className="border px-4 py-2">{appointment.doctor.display_name}</td>
                  <td className="border px-4 py-2">{appointment.practice.name}</td>
                  <td className="border px-4 py-2">{appointment.booked_by.display_name}</td>
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
