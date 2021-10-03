import { useState, useEffect, useContext, Fragment } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { useRouter } from 'next/router';
import UserContext from "../../../../context/UserContext";

import Router from "next/router";
import Layout from "../../../../components/Layout/Layout";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "reactstrap";

import USER from "../../../../graphql/user.query";
import UPDATE_USER_MUTATION from "../../../../graphql/update-user.mutation";

const UserEdit = (props) => {
  const [user, setUser] = useState({});

  const router = useRouter();
  const { uid } = router && router.query;

  const { me } = useContext(UserContext);

  const isAdmin = () => {
    const roles = me && me.roles;
    return roles && (roles.includes("admin") || roles.includes("super-admin"));
  }

  const { data, loading, error } = useQuery(USER, {
    variables: { _id: uid }
  });

  const [addUser, { error: updateUserError }] = useMutation(UPDATE_USER_MUTATION, {
    variables: {
      input: {
        user: {
          _id: uid
        },
        patch: {
          username: user && user.username,
          display_name: user && user.display_name,
          email: user && user.email,
          password: user && user.password,
          resetToken: user && user.resetToken,
          resetTokenExpiry: user && user.resetTokenExpiry,
          practice: user.practice && user.practice.name,
          roles: user.roles && user.roles
        }
      }
    },
    onCompleted: () => setUser({ ...user, mutationComplete: true }),
  });

  const saveToState = (evt) => {
    let name = evt.target.name;
    let value = evt.target.value;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
  }, [data]);

  return (
    <Layout>
      <Row style={{ paddingTop: "20px" }}>
        <Col sm="12" md={{ size: 12, offset: 0 }}>
          <div className="my-2">
            <button
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4  text-sm  border border-gray-400 rounded"
              onClick={() => Router.back()}>
                Back
            </button>
          </div>
          {isAdmin() &&
            <Card>
              {error &&
                <div>{error.message}</div>
              }
              <CardHeader className="text-center">{`User ${uid}`}</CardHeader>
              <CardBody>
                {updateUserError && (
                  <CardFooter>
                    <Alert style={{ marginBottom: "0" }} color="danger">
                      {updateUserError.message}
                    </Alert>
                  </CardFooter>
                )}
                {user.mutationComplete && !updateUserError && (
                  <CardFooter>
                    <Alert style={{ marginBottom: "0" }} color="success">
                      User successfully updated
                    </Alert>
                  </CardFooter>
                )}
                {user &&
                  <Form
                    method="post"
                    onSubmit={async (evt) => {
                      evt.preventDefault();
                      setUser({
                        ...user
                      });
                      await addUser();
                    }}
                  >
                    <FormGroup>
                      <Input
                        type="text"
                        name="username"
                        value={(user.username && user.username) || ''}
                        placeholder="Username"
                        onChange={saveToState}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="text"
                        name="display_name"
                        value={(user.display_name && user.display_name) || ''}
                        placeholder="Display name"
                        onChange={saveToState}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="email"
                        name="email"
                        value={(user.email && user.email) || ''}
                        placeholder="Email"
                        onChange={saveToState}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="password"
                        name="password"
                        value={(user.password && user.password) || ''}
                        placeholder="Password"
                        onChange={saveToState}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="text"
                        name="resetToken"
                        value={(user.resetToken && user.resetToken) || ''}
                        placeholder="Reset token"
                        onChange={saveToState}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="text"
                        name="resetTokenExpiry"
                        value={(user.resetTokenExpiry && user.resetTokenExpiry) || ''}
                        placeholder="Reset token expiry"
                        onChange={saveToState}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="text"
                        name="practice"
                        value={(user.practice && user.practice.name) || ''}
                        placeholder="Practice"
                        onChange={saveToState}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="text"
                        name="roles"
                        value={(user.roles && user.roles) || ''}
                        placeholder="Roles (comma separated - e.g. user, receptionist)"
                        onChange={saveToState}
                      />
                    </FormGroup>
                    <button
                      className="bg-blue-400 hover:bg-blue-500 text-white w-full font-semi-bold text-sm px-4 py-2 rounded"
                      type="submit">
                      Save
                    </button>
                  </Form>
                }
              </CardBody>
            </Card>
          }
        </Col>
      </Row>
    </Layout>
  )
}

export default UserEdit;
