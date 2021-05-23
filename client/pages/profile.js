import User from "../components/Auth/User";
import Layout from "../components/Layout/Layout";
import Profile from "../components/Profile";

const ProfilePage = () => {
  return (
    <Layout>
      <User>{(me) => me && <Profile me={me}/>}</User>
    </Layout>
  )
}

export default ProfilePage;
