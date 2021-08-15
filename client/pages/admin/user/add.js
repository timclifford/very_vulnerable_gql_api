import { useState, Fragment, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import UserContext from "../../../context/UserContext";
import Router from "next/router";
import Layout from "../../../components/Layout/Layout";
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
import USER_ADD_MUTATION from "../../../graphql/add-user.mutation";

const UserAdd = () => {
  const { me } = useContext(UserContext);

  const isAdmin = () => {
    const roles = me && me.roles;
    return roles && (roles.includes("admin") || roles.includes("super-admin"));
  }

  const [user, setUser] = useState({
    username: "",
    display_name: "",
    email: "",
    password: "",
    practice: "",
    roles: "",
    mutationComplete: false,
  });

  const [addUser, { error: error }] = useMutation(USER_ADD_MUTATION, {
    variables: {
      username: user && user.username,
      display_name: user && user.display_name,
      email: user && user.email,
      password: user && user.password,
      practice: user && user.practice,
      roles: user && [...user.roles.replace(/\s/g, '').split(',')]
    },
    onCompleted: () => setUser({ ...user, mutationComplete: true }),
  });

  const saveToState = (evt) => {
    let value = evt.target.value;
    setUser({ ...user, [evt.target.name]: value });
  };

  return (
    <Layout>
      <Row style={{ paddingTop: "20px" }}>
        <Col sm="12" md={{ size: 12, offset: 0 }}>
          <div className="my-2">
            <button
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4  text-sm  border border-gray-400 rounded"
              onClick={() => Router.back()}>Back
            </button>
          </div>
          {isAdmin() &&
            <Card>
              <CardHeader className="text-center">Add user</CardHeader>
              <CardBody>
                {error && (
                  <CardFooter>
                    <Alert style={{ marginBottom: "0" }} color="danger">
                      {error.message}
                    </Alert>
                  </CardFooter>
                )}
                {user.mutationComplete && !error && (
                  <CardFooter>
                    <Alert style={{ marginBottom: "0" }} color="success">
                      User successfully added
                    </Alert>
                  </CardFooter>
                )}
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
                      value={user.username}
                      placeholder="Username"
                      onChange={saveToState}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      name="display_name"
                      placeholder="Display name"
                      value={user.display_name}
                      onChange={saveToState}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={user.email}
                      onChange={saveToState}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                        type="password"
                      name="password"
                      placeholder="Password"
                      value={user.password}
                      onChange={saveToState}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      name="practice"
                      placeholder="Practice"
                      value={user.practice}
                      onChange={saveToState}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      name="roles"
                      placeholder="Roles (comma separated - e.g. user, receptionist)"
                      value={user.roles}
                      onChange={saveToState}
                    />
                  </FormGroup>
                  <button
                    className="bg-blue-400 hover:bg-blue-500 text-white w-full font-semi-bold text-sm px-4 py-2 rounded"
                    type="submit">
                    Add
                  </button>
                </Form>
              </CardBody>
            </Card>
          }
        </Col>
      </Row>
    </Layout>
  )
}

export default UserAdd;
