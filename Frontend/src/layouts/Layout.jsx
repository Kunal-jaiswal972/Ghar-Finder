import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

import Loader from "@/components/Loader";
import Navbar from "@/components/navbar/Navbar";

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
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <Loader />;
  if (!isSignedIn) return <Navigate to="/sign-in" />;

  return <PublicLayout />;
};
