import User from "../components/Auth/User";
import Dashboard from "../components/Dashboard";

const Index = () => {
  return (
      <User>{(me) => me && <Dashboard me={me}/>}</User>
  );
}

export default Index;
