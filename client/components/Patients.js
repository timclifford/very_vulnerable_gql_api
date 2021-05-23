import { Fragment } from "react";
import Router from "next/router";
import { useRouter } from 'next/router';
import PatientList from "../components/PatientList";
import { Row, Col } from "reactstrap";
import Link from "next/link";

const Patients = ({ me }) => {
  // if (process.browser && !me) {
  //   Router.push("/signin");
  //   return null;
  // }

  return (
    <Fragment>
      <Row style={{ paddingTop: "30px" }}>
        <Col>
          <Link href="/patient/add">
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 text-sm font-semibold py-2 px-4 border border-gray-400 rounded"
                style={{ cursor: "pointer" }}>
                Add a patient
              </button>
          </Link>
        </Col>
      </Row>
      <Row style={{ paddingTop: "30px" }}>
        <Col>
          <PatientList user={me}/>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Patients;
