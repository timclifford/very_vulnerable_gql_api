import User from "../components/Auth/User";
import Appointments from "../components/Appointments";
import Layout from "../components/Layout/Layout";

const AppointmentsPage = () => {
  return (
    <Layout>
      <User>{(me) => me && <Appointments me={me}/>}</User>
    </Layout>
  )
}

export default AppointmentsPage;
