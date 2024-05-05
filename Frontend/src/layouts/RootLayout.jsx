import { Outlet, useNavigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

import Navbar from "@/components/Navbar";

export default function RootLayout() {
  const navigate = useNavigate();
  const PUBLISHABLE_KEY = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider
      navigate={navigate}
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        variables: {
          colorPrimary: "hsl(263.4, 70%, 50.4%)",
        },
      }}
    >
      <div className="mb-10">
        <Navbar />
        <main className="mt-14">
          <Outlet />
        </main>
      </div>
    </ClerkProvider>
  );
}
