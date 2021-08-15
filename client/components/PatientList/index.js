import { useQuery } from "@apollo/client";
import PATIENTS from "../../graphql/patients.query";
import Link from "../Link";
import Error from "../Errors";

const PatientList = (me) => {
  const { data, loading, error } = useQuery(PATIENTS, {
    variables: { doctor: me.user.username }
  });
  const { patients } = data && data || [];

  if (data && data.patients === null) {
    return (
      <div>No patients</div>
    );
  }

  if (error) {
    return <Error>Error: {JSON.stringify(error.message)}</Error>;
  }

  const PatientLink = ({_id, text = "More"}) => {
    return (
      <Link
        to={'/patient/'+_id}
        className="block leading-tight font-semibold text-gray-800 hover:underline"
      >
        {text}
      </Link>
    )
  };

  const EditPatientLink = ({_id, text = "Edit"}) => {
    return (
      <Link
        to={'/patient/'+_id+'/edit'}
        className="block leading-tight font-semibold text-gray-800 hover:underline"
      >
        {text}
      </Link>
    )
  }

  return (
    <>
    {loading && <div className="py-4">Loading...</div>}
    {patients &&
      <table className="table-auto mb-8 w-full">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="border px-4 py-2">Patient ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Practice</th>
            <th className="border px-4 py-2">Phone number</th>
            <th className="border px-4 py-2">Doctor</th>
            <th className="border px-4 py-2">Details</th>
            <th className="border px-4 py-2"></th>
          </tr>
        </thead>
        {patients.map((patient, index) => {
          return (
            <tbody key={patient._id}>
              <tr className="text-center">
                <td className="border px-4 py-2"><PatientLink _id={patient._id} text={patient._id}/></td>
                <td className="border px-4 py-2">{patient.name}</td>
                <td className="border px-4 py-2">{patient.address}</td>
                <td className="border px-4 py-2">{patient.practice.name}</td>
                <td className="border px-4 py-2">{patient.phone_number}</td>
                <td className="border px-4 py-2">{patient.doctor}</td>
                <td className="border px-4 py-2"><PatientLink _id={patient._id}/></td>
                <td className="border px-4 py-2"><EditPatientLink _id={patient._id}/></td>
              </tr>
            </tbody>
          )
        })}
      </table>
    }
    </>
  );
};

export default PatientList;
