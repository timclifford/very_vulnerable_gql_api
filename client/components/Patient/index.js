import { Fragment } from "react";
import { useQuery } from "@apollo/client";
import Router from "next/router";
import NoteForm from "../Notes/NoteForm";
import Notes from "../Notes";
import Link from 'next/link';

const Patient = (patient) => {
  const { patient: p } = patient;

  return (
    <div>
      <div className="m-4 flex justify-between">
        <button
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 text-sm border border-gray-400 rounded"
          onClick={() => Router.back()}>Back
        </button>
        <Link href={`/patient/${p._id}/edit`}>
          <button
            className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 text-sm border border-gray-400 rounded"
            >
            Edit
          </button>
       </Link>
      </div>
      <div className="m-4">
        <h2 className="pb-2 font-semibold text-sm">Key information</h2>
        <table className="table-auto mb-8 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Patient ID</th>
              <th className="border px-4 py-2">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">{p._id}</td>
              <td className="border px-4 py-2">{p.name}</td>
            </tr>
          </tbody>
        </table>
        <h2 className="pb-2 font-semibold text-sm">Patient data</h2>
        <div className="flex flex-auto">
          <table className="w-1/2">
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-semibold bg-gray-100">ID</td>
                <td className="border px-4 py-2">{p._id}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold bg-gray-100">Name</td>
                <td className="border px-4 py-2">{p.name}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold bg-gray-100">Gender</td>
                <td className="border px-4 py-2">{p.medical_record.sex}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold bg-gray-100">Age</td>
                <td className="border px-4 py-2">{p.medical_record.age}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold bg-gray-100">Weight</td>
                <td className="border px-4 py-2">{p.medical_record.weight}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold bg-gray-100">Doctor</td>
                <td className="border px-4 py-2">{p.doctor}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold bg-gray-100">Phone number</td>
                <td className="border px-4 py-2">{p.phone_number}</td>
              </tr>
            </tbody>
          </table>
          <table className="w-1/2">
            <tbody>
              <tr>
                <td className="border px-4 py-2 bg-gray-100 font-semibold">Recent heart events</td>
                <td className="border px-4 py-2">{p.medical_record.recent_heart_events ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 bg-gray-100 font-semibold">Current health assessment</td>
                <td className="border px-4 py-2">{p.medical_record.current_health_assessment}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 bg-gray-100 font-semibold">Diabetes</td>
                <td className="border px-4 py-2">{p.medical_record.diabetes ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 bg-gray-100 font-semibold">CRP</td>
                <td className="border px-4 py-2">{p.medical_record.crp}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="m-4">
        <h2 className="mb-2 font-semibold text-sm">Notes</h2>
        <Notes patient={p}/>
        <NoteForm patient={p}/>
      </div>
    </div>
  );
};

export default Patient;
