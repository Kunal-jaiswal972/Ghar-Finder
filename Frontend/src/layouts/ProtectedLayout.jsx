import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function ProtectedLayout({ children }) {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const navigate = useNavigate();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  console.log(userId);

  if (!isSignedIn) {
    navigate("/sign-in");
    return null;
  }

  return <>{children}</>;
}
