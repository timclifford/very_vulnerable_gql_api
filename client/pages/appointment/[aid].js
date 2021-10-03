import { useQuery } from "@apollo/client";
import { useRouter } from 'next/router';
import Layout from "../../components/Layout/Layout";
import Appointment from "../../components/Appointment";
import APPOINTMENT from "../../graphql/appointment.query";

const AppointmentSlug = () => {
  const router = useRouter()
  const { aid } = router.query

  const { data, loading, error } = useQuery(APPOINTMENT, {
    variables: { _id: aid },
  });

  if (loading) {
    return <p className="py-4">Loading...</p>;
  }
  if (error) {
    return (
      <Layout>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
          <strong className="font-bold">Access denied! </strong>
          <span className="block sm:inline">{error.message}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Appointment appointment={data.appointment} />
    </Layout>
  )
}

export default AppointmentSlug;
