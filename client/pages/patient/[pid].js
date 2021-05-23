import { useQuery } from "@apollo/react-hooks";
import { useRouter } from 'next/router';
import Layout from "../../components/Layout/Layout";
import Patient from "../../components/Patient";
import PATIENT from "../../graphql/patient.query";

const PatientSlug = () => {
  const router = useRouter()
  const { pid } = router.query

  const { data, loading, error } = useQuery(PATIENT, {
    variables: { _id: pid },
  });

  if (loading) {
    return <p className="py-4">Loading...</p>;
  }
  if (error) {
    return (
      <Layout>
        <div>{JSON.stringify(error.message)}</div>
      </Layout>
    );
  }

  return (
    <Layout>
        <Patient patient={data.patient} />
    </Layout>
  )
}

export default PatientSlug;
