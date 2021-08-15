import React, { createContext } from "react";
import { useQuery } from "@apollo/client";
import CURRENT_USER_QUERY from "../graphql/current-user.query";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const { data, loading } = useQuery(CURRENT_USER_QUERY);
  const me = data || loading;

  return <UserContext.Provider value={me}>{children}</UserContext.Provider>;
};

export default UserContext;
