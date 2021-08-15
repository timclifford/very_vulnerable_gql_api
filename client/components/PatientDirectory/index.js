import { useQuery } from "@apollo/client";
import PATIENTS_DIRECTORY from "../../graphql/patientsDirectory.query";
import Link from "../Link";
import Error from "../Errors";

const PatientDirectory = (me) => {
  const { data, loading, error } = useQuery(PATIENTS_DIRECTORY, {
    variables: { practice: me.user.practice._id }
  });

  const { patientsDirectory } = data && data || [];

  if (error) {
    return (
      <div className="p-4">
        <div className="flex flex-auto border p-4 mb-4">
          <Error>Error: {JSON.stringify(error.message)}</Error>
        </div>
      </div>
    );
  }

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
    {!patientsDirectory && <div>No patients</div>}
    {patientsDirectory &&
      <table className="table-auto mb-8 w-full">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="border px-4 py-2">Patient ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Practice</th>
            <th className="border px-4 py-2">Doctor</th>
            <th className="border px-4 py-2"></th>
          </tr>
        </thead>
        {patientsDirectory.map(({_id, name, address, practice, doctor}) => {
          return (
            <tbody key={_id}>
              <tr className="text-center">
                <td className="border px-4 py-2">{_id}</td>
                <td className="border px-4 py-2">{name}</td>
                <td className="border px-4 py-2">{address}</td>
                <td className="border px-4 py-2">{practice.name}</td>
                <td className="border px-4 py-2">{doctor}</td>
                <td className="border px-4 py-2"><EditPatientLink _id={_id}/></td>
              </tr>
            </tbody>
          )
        })}
      </table>
    }
    </>
  );
};

export default PatientDirectory;
