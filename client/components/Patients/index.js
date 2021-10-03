import { Fragment } from "react";
import Router from "next/router";
import { useRouter } from 'next/router';
import PatientList from "../PatientList";
import PatientDirectory from "../PatientDirectory";
import { Row, Col } from "reactstrap";
import Link from "next/link";

const Patients = ({ me }) => {
  return (
    <Fragment>
      <Row style={{ paddingTop: "30px" }}>
        <Col>
          <Link href="/patient/add">
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 text-sm font-semibold py-2 px-4 border border-gray-400 rounded"
                style={{ cursor: "pointer" }}>
                {me && me.roles.includes("doctor") ? <>Add a medical record</> : <>Add a patient</>}
              </button>
          </Link>
        </Col>
      </Row>
      <Row style={{ paddingTop: "30px" }}>
        <Col>
          {me && me.roles.includes("doctor") && <PatientList user={me}/>}
          {me && me.roles.includes("receptionist") && <PatientDirectory user={me}/>}
        </Col>
      </Row>
    </Fragment>
  );
};

export default Patients;
