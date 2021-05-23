import Layout from "../components/Layout/Layout";
import Dashboard from "../components/Dashboard";
import User from "../components/Auth/User";

const DashboardPage = () => (
  <Layout>
    <User>{(me) => me && <Dashboard user={me}></Dashboard>}</User>
  </Layout>
);

export default DashboardPage;
