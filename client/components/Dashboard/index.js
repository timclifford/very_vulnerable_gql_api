import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";

const Dashboard = ({me}) => {
  return (
    <div className="p-2">
      <div className="px-2 py-4">
        <h2 className="font-bold">Welcome, {me && me.display_name}</h2>
      </div>
      <div className="px-2 py-4">
        <h3 className="font-bold">{me && me.practice.name}</h3>
        <p>{me && me.practice.address}</p>
        <p>{me && me.practice.phone_number}</p>
      </div>
      <div className="flex flex-auto py-4">
        <div className="w-1/2 text-center border p-4 mx-2">
          <h3 className="font-bold px-4">Patients</h3>
          <p className="px-4 py-4">Patient healthcare management</p>
          <Link href="/patients">
            <button className="bg-blue-400 hover:bg-blue-500 text-white font-semi-bold text-sm px-4 py-2 rounded">
              See patients
            </button>
          </Link>
        </div>
        <div className="w-1/2 text-center border p-4 mx-2">
          <h3 className="font-bold px-4">Profile</h3>
          <p className="px-4 py-4">Profile management</p>
          <Link href="/profile">
            <button className="bg-blue-400 hover:bg-blue-500 text-white font-semi-bold text-sm px-4 py-2 rounded">
              See profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
