import { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import CURRENT_USERS_QUERY from "../../graphql/current-users.query";
import Signin from "./Signin";
import Error from '../Errors';

const Users = (props) => {
  const { data, loading, error } = useQuery(CURRENT_USERS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <Error>API Error: {JSON.stringify(error.message)}</Error>;
  }

  if (!data.me) {
    return <Signin />;
  }

  return <Fragment>{props.children(data)}</Fragment>;
};

export default Users;
export { CURRENT_USERS_QUERY };
