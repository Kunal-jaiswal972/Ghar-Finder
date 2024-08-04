import { Navigate, Outlet, useLocation } from "react-router-dom";

import Loader from "@/components/Loader";
import Navbar from "@/components/navbar/Navbar";

import { useGetUserQuery } from "@/services/queries";

export function PublicLayout() {
  return (
    <div className="h-screen max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm mx-auto px-5 flex flex-col gap-1">
      <Navbar />
      <main className="h-[calc(100vh-80px)]">
        <Outlet />
      </main>
    </div>
  );
}

export const ProtectedLayout = () => {
  const {
    auth,
    isLoading,
  } = useGetUserQuery();
  const location = useLocation();

  if (isLoading) return <Loader />;
  if (!auth.isSignedIn)
    return (
      <Navigate
        to="/sign-in"
        replace={true}
        state={{ from: location.pathname }}
      />
    );

  return <PublicLayout />;
};
