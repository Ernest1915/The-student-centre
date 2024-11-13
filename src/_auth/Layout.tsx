import { Outlet, Navigate } from "react-router-dom";

const Layout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section>
            <Outlet />
          </section>
        </>
      )}
    </>
  );
};

export default Layout;
