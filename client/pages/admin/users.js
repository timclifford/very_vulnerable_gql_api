import User from "../../components/Auth/User";
import Users from "../../components/Auth/Users";
import Layout from "../../components/Layout/Layout";

const UsersPage = () => {
  return (
    <Layout>
      <User>
        {(me) => me && <Users me={me}/>}
      </User>
    </Layout>
  )
}

export default UsersPage;
