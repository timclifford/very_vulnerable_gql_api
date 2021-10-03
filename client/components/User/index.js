import { useState } from "react";
import Router from "next/router";
import Link from 'next/link';
import { useMutation } from "@apollo/client";
import {
  Alert
} from "reactstrap";

import DELETE_USER_MUTATION from "../../graphql/delete-user.mutation";

const User = ({ ...user }) => {
  const [deletion, setDeletion] = useState({ mutationComplete: false });

  const [deleteUser, { error }] = useMutation(DELETE_USER_MUTATION, {
    variables: {
      input: {
        user: {
          _id: user._id
        }
      }
    },
    onCompleted: () => setDeletion({ mutationComplete: true }),
  });

  const DeleteUser = ({ _id }) => {
    return (
      <button
        className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 text-sm border border-red-400 rounded"
        style={{ cursor: "pointer" }}
        onClick={async (evt) => {
          evt.preventDefault();
          await deleteUser();
        }}
      >
        Delete
      </button>
    )
  }

  return (
    <>
      {deletion.mutationComplete && !error && (
        <div className="m-4">
          <Alert style={{ marginBottom: "0" }} color="success">
            User successfully deleted
          </Alert>
        </div>
      )}
      {!deletion.mutationComplete &&
      <>
        <div className="m-4 flex justify-between">
          <div>
            <button
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 text-sm border border-gray-400 rounded"
              onClick={() => Router.back()}
            >
              Back
            </button>
          </div>
          <div>
            <DeleteUser _id={user._id}/>
            <Link href={`/admin/user/${user._id}/edit`}>
              <button
                className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 text-sm border border-gray-400 mx-2 rounded"
              >
                Edit
              </button>
            </Link>
          </div>
        </div>
        <div className="m-4 p-4">
          <h2 className="pb-2 font-semibold text-sm">User</h2>
          <table className="table-auto mb-8 w-full">
            <tbody>
              <tr>
                <td className="border px-4 py-2 bg-gray-100">ID</td>
                <td className="border px-4 py-2">{user._id}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 bg-gray-100">Username</td>
                <td className="border px-4 py-2">{user.username}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 bg-gray-100">Display Name</td>
                <td className="border px-4 py-2">{user.display_name}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 bg-gray-100">Email</td>
                <td className="border px-4 py-2">{user.email}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 bg-gray-100">Roles</td>
                <td className="border px-4 py-2">{user.roles && user.roles.join(', ').toString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
      }
    </>
  );
};

export default User;
