import useAuth from "../auth/useAuth";

const AdminPage = () => {
  const { auth } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Page</h1>
      <p>Only accessible by Admins!</p>
      <p>Logged in as: {auth.user?.username}</p>
    </div>
  );
};

export default AdminPage;
