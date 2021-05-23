const Profile = ({me}) => {
  return (
    <div className="m-4">
      <h2 className="pb-2 font-semibold text-sm">Profile</h2>
      <table className="table-auto mb-8 w-full">
        <tbody>
          <tr>
            <td className="border px-4 py-2 bg-gray-100">ID</td>
            <td className="border px-4 py-2">{me._id}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 bg-gray-100">Username</td>
            <td className="border px-4 py-2">{me.username}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 bg-gray-100">Display Name</td>
            <td className="border px-4 py-2">{me.display_name}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 bg-gray-100">Email</td>
            <td className="border px-4 py-2">{me.email}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 bg-gray-100">Practice</td>
            <td className="border px-4 py-2">
              <p>{me.practice.name}</p>
              <p>{me.practice.address}</p>
              <p>{me.practice.phone_number}</p>
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 bg-gray-100">Roles</td>
            <td className="border px-4 py-2">{me.roles.join(', ').toString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
