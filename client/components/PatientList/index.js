import { useQuery } from "@apollo/react-hooks";
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

  const PatientLink = ({_id, text = "more"}) => {
    return (
      <Link
        to={'/patient/'+_id}
        className="block leading-tight font-semibold text-gray-800 hover:underline"
      >
        {text}
      </Link>
    )
  };

  return (
    <>
    {loading && <div className="py-4">Loading...</div>}
    {patients &&
      <table className="table-auto mb-8 w-full">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="border px-4 py-2">Patient ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">Weight</th>
            <th className="border px-4 py-2">Doctor</th>
            <th className="border px-4 py-2">Details</th>
          </tr>
        </thead>
        {patients.map(({_id, name, sex, weight, doctor}) => {
          return (
            <tbody key={_id}>
              <tr className="text-center">
                <td className="border px-4 py-2"><PatientLink _id={_id} text={_id}/></td>
                <td className="border px-4 py-2">{name}</td>
                <td className="border px-4 py-2">{sex}</td>
                <td className="border px-4 py-2">{weight}</td>
                <td className="border px-4 py-2">{doctor}</td>
                <td className="border px-4 py-2"><PatientLink _id={_id}/></td>
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
