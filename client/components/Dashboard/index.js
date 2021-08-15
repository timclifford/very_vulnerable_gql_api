import { useQuery } from "@apollo/client";
import Link from "next/link";

const Dashboard = ({me}) => {
  return (
    <div className="p-4">
      <div className="flex flex-auto border p-4 mb-4">
        <div className="w-1/2">
          <h2 className="font-bold pb-4">Welcome, {me && me.display_name}</h2>
          {me && me.practice &&
          <div className="practice">
            <h3 className="font-bold">Practice</h3>
            <p>{me.practice.name}</p>
            <p>{me.practice.address}</p>
            <p>{me.practice.phone_number}</p>
          </div>
          }
        </div>
        <div className="w-1/2 text-right">
          <Link href="/profile">
            <button className="bg-blue-400 hover:bg-blue-500 text-white font-semi-bold text-sm px-4 py-2 rounded">
              Update profile
            </button>
          </Link>
        </div>
      </div>
      {me && me.roles.includes('receptionist') &&
      <div className="patient-bookings">
        <h3 className="font-bold py-2">Practice management</h3>
        <div className="flex flex-auto py-4">
          <div className="w-1/2 text-center border p-4">
            <h3 className="font-bold px-4">Appointments</h3>
            <p className="px-4 py-4">Manage patient appointments</p>
            <Link href="/appointments">
              <button className="bg-blue-400 hover:bg-blue-500 text-white font-semi-bold text-sm px-4 py-2 rounded">
                Appointments
              </button>
            </Link>
          </div>
          <div className="w-1/2 text-center border p-4">
            <h3 className="font-bold px-4">Patient directory</h3>
            <p className="px-4 py-4">Manage patient details</p>
            <Link href="/patients-directory">
              <button className="bg-blue-400 hover:bg-blue-500 text-white font-semi-bold text-sm px-4 py-2 rounded">
                Manage patient details
              </button>
            </Link>
          </div>
        </div>
      </div>
      }
      {me && me.roles.includes('doctor') &&
      <div className="patient-health">
        <h3 className="font-bold py-2">Patient management</h3>
        <div className="flex flex-auto py-4">
          <div className="w-1/2 text-center border p-4">
            <h3 className="font-bold px-4">Patient health</h3>
            <p className="px-4 py-4">Patient healthcare management</p>
            <Link href="/patients">
              <button className="bg-blue-400 hover:bg-blue-500 text-white font-semi-bold text-sm px-4 py-2 rounded">
                See patients
              </button>
            </Link>
          </div>
        </div>
      </div>
      }
      {me && me.roles.some(r => (r == 'admin' || r == 'super-admin')) &&
      <div className="user-management">
        <h3 className="font-bold py-2">System management</h3>
        <div className="flex flex-auto py-4">
          <div className="w-1/2 text-center border p-4">
            <h3 className="font-bold px-4">Users</h3>
            <p className="px-4 py-4">User management</p>
            <Link href="/admin/users">
              <button className="bg-blue-400 hover:bg-blue-500 text-white font-semi-bold text-sm px-4 py-2 rounded">
                See users
              </button>
            </Link>
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default Dashboard;
