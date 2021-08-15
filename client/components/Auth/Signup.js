import { useState, Fragment } from "react";
import { useMutation } from "@apollo/client";
import {
  Alert,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "reactstrap";
import SIGNUP_MUTATION from "../../graphql/signup.mutation";
import CURRENT_USER_QUERY from "../../graphql/current-user.query";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    display_name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    mutationComplete: false,
  });

  const [signupUser, { error }] = useMutation(SIGNUP_MUTATION, {
    variables: user,
    update: (store, { data: { signupUser } }) => {
      if (signupUser.token) {
        localStorage.setItem("token", signupUser.token);
      }
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    onCompleted: () =>
      setUser({
        ...user,
        mutationComplete: true,
      }),
  });

  const saveToState = (evt) => {
    setUser({ ...user, [evt.target.name]: evt.target.value });
  };

  return (
    <Fragment>
      <Row style={{ paddingTop: "100px" }}>
        <Col sm="12" md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader className="text-center">Sign up</CardHeader>
            <CardBody>
              <Form
                method="post"
                onSubmit={async (evt) => {
                  evt.preventDefault();
                  setUser({
                    ...user,
                    username: "",
                    display_name: "",
                    email: "",
                    password: "",
                    passwordConfirm: "",
                  });
                  await signupUser();
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
                    value={user.display_name}
                    placeholder="Display name"
                    onChange={saveToState}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    value={user.email}
                    placeholder="Email Address"
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
                    type="password"
                    name="passwordConfirm"
                    placeholder="Confirm Password"
                    value={user.passwordConfirm}
                    onChange={saveToState}
                  />
                </FormGroup>
                <button
                  className="bg-blue-400 hover:bg-blue-500 text-white w-full font-semi-bold text-sm px-4 py-2 rounded"
                  type="submit"
                >
                  Sign up
                </button>
              </Form>
            </CardBody>
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
                  User successfully signed up
                </Alert>
              </CardFooter>
            )}
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Signup;
