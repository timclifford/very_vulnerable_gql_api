import User from "../components/Auth/User";
import Patients from "../components/Patients";
import Layout from "../components/Layout/Layout";

const PatientsPage = (props) => {
  return (
    <Layout>
      <User>{(me) => me && <Patients me={me}/>}</User>
    </Layout>
  )
}

export default PatientsPage;
