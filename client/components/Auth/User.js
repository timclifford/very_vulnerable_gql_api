import { Fragment, useContext } from "react";
import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import CURRENT_USER_QUERY from "../../graphql/current-user.query";
import Signin from "./Signin";
import UserContext from "../../context/UserContext";
import Error from '../Errors';

const User = (props) => {
  const { me } = useContext(UserContext);

  // const { data, loading, error } = useQuery(CURRENT_USER_QUERY);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <Error>API Error: {JSON.stringify(error.message)}</Error>;
  // }


  if (!me) {
    return <Signin />;
  }

  return <Fragment>{props.children(me)}</Fragment>;
};

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
