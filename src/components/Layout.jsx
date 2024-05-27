import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout({ user, handleLogout }) {
  return (
    <>
      <Header user={user} handleLogout={handleLogout} />
      <Outlet />
    </>
  );
}

export default Layout;
