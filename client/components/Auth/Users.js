import { Fragment } from "react";
import { useQuery } from "@apollo/client";
import Signin from "./Signin";
import Error from '../Errors';
import Link from "next/link";
import { Alert, Row, Col } from "reactstrap";

import CURRENT_USERS_QUERY from "../../graphql/current-users.query";

const Users = (props) => {
  const { data, loading, error } = useQuery(CURRENT_USERS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <Error>API Error: {JSON.stringify(error.message)}</Error>;
  }

  if (!props.me) {
    return <Signin />;
  }

  const UserLink = ({ _id, text = "More" }) => {
    return (
      <Link
        href={'/admin/user/'+_id}
      >
        {text}
      </Link>
    )
  }

  const EditUserLink = ({ _id }) => {
    return (
      <Link
        href={'/admin/user/'+_id+'/edit'}
      >
      <button
        className="bg-blue hover:bg-blue-100 text-white-800 text-sm font-semibold py-2 px-4 border border-gray-400 rounded"
        style={{ cursor: "pointer" }}>
        Edit
      </button>
      </Link>
    )
  }

  return (
    <div>
      {loading && <div>Loadiing</div>}
      <div className="users m-4">
        <h2 className="font-semibold text-sm">Users</h2>
        <Row style={{ padding: "30px 0" }}>
          <Col>
            <Link href="/admin/user/add">
              <button
                className="bg-blue hover:bg-blue-100 text-white-800 text-sm font-semibold py-2 px-4 border border-gray-400 rounded"
                style={{ cursor: "pointer" }}>
                Add a user
              </button>
            </Link>
          </Col>
        </Row>
        <table className="table-auto mb-8 w-full">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Display Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Practice</th>
              <th className="border px-4 py-2">Roles</th>
              <th className="border px-4 py-2">More</th>
              <th className="border px-4 py-2">Edit</th>
            </tr>
          </thead>
          {data.users.map(({ _id, username, display_name, email, practice, roles }) => {
            return (
              <tbody key={username}>
                <tr className="text-center">
                  <td className="border px-4 py-2"><UserLink _id={_id} text={_id}/></td>
                  <td className="border px-4 py-2">{username}</td>
                  <td className="border px-4 py-2">{display_name}</td>
                  <td className="border px-4 py-2">{email}</td>
                  <td className="border px-4 py-2">{practice ? practice.name : '-'}</td>
                  <td className="border px-4 py-2">{roles && roles.join(', ')}</td>
                  <td className="border px-4 py-2"><UserLink _id={_id}/></td>
                  <td className="border px-4 py-2"><EditUserLink _id={_id}/></td>
                </tr>
              </tbody>
            )
          })}
        </table>
      </div>
    </div>
  );
};

export default Users;
export { CURRENT_USERS_QUERY };
