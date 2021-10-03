import { Fragment } from "react";
import { useQuery } from "@apollo/client";
import Router from "next/router";
import NoteForm from "../Notes/NoteForm";
import Notes from "../Notes";
import Link from 'next/link';

const Appointment = ({ appointment }) => {
  const date = new Date(appointment.date);

  return (
    <div>
      <div className="m-4 flex justify-between">
        <button
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 text-sm border border-gray-400 rounded"
          onClick={() => Router.back()}>Back
        </button>
        <Link href={`/appointment/${appointment._id}/edit`}>
          <button
            className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 text-sm border border-gray-400 rounded"
            >
            Edit
          </button>
       </Link>
      </div>
      <div className="m-4">
        <h2 className="pb-2 font-semibold text-sm">Appointment information</h2>
        <table className="table-auto mb-8 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Booked by</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">{date.toDateString()}</td>
              <td className="border px-4 py-2">{appointment.booked_by.display_name}</td>
            </tr>
          </tbody>
        </table>
        <h2 className="pb-2 font-semibold text-sm">Patient information</h2>
        <table className="table-auto mb-8 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Patient ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Practice</th>
              <th className="border px-4 py-2">Doctor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">{appointment._id}</td>
              <td className="border px-4 py-2">{appointment.patient.name}</td>
              <td className="border px-4 py-2">{appointment.practice.name}</td>
              <td className="border px-4 py-2">{appointment.doctor.display_name}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointment;
