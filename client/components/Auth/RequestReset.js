import { useState } from "react";
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
import REQUEST_RESET_MUTATION from "../../graphql/request-reset.mutation";

const RequestReset = () => {
  const [user, setUser] = useState({ email: "", mutationComplete: false });
  const [requestReset, { error }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: {
      email: user.email,
    },
    onCompleted: () => setUser({ email: "", mutationComplete: true }),
  });
  const saveToState = (evt) => {
    setUser({ ...user, [evt.target.name]: evt.target.value });
  };
  return (
    <Row style={{ paddingTop: "100px" }}>
      <Col sm="12" md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
        <Card>
          <CardHeader className="text-center">Request Password reset</CardHeader>
          <CardBody>
            <Form
              onSubmit={async (evt) => {
                evt.preventDefault();
                await requestReset();
              }}
            >
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={user.email}
                  onChange={saveToState}
                />
              </FormGroup>
              <button
                className="bg-blue-400 hover:bg-blue-500 text-white w-full font-semi-bold text-sm px-4 py-2 rounded"
                type="submit"
              >
                Request reset
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
                Please check your email for a reset link
              </Alert>
            </CardFooter>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default RequestReset;
