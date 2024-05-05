import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedLayout() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const navigate = useNavigate();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  console.log(userId);

  if (!isSignedIn) {
    navigate("/sign-in");
  }

  return <Outlet />;
}
