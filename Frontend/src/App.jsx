import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { DEV_MODE, toastOptions } from "@/config/config";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClerkProvider } from "@clerk/clerk-react";

import { ProtectedLayout, PublicLayout } from "@/layouts/Layout";

import { ThemeProvider } from "@/components/themes/theme-provider";
import SignInComponent from "@/components/auth/SignInComponent";
import SignUpComponent from "@/components/auth/SignUpComponent";

import CreateListing from "@/pages/CreateListing";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import ErroPage from "@/pages/ErrorPage";
import ListingPage from "@/pages/ListingPage";
import SingleListingPage from "@/pages/SingleListingPage";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
});

function AppWrapper() {
  const navigate = useNavigate();
  const PUBLISHABLE_KEY = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider
      navigate={(to) => navigate(to)}
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        variables: {
          colorPrimary: "hsl(263.4, 70%, 50.4%)",
        },
      }}
    >
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="listings" element={<ListingPage />} />
              <Route path="listings/:id" element={<SingleListingPage />} />
              <Route path="sign-in/*" element={<SignInComponent />} />
              <Route path="sign-up/*" element={<SignUpComponent />} />
            </Route>
            <Route path="/" element={<ProtectedLayout />}>
              <Route path="create" element={<CreateListing />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<ErroPage />} />
          </Routes>

          {DEV_MODE && <ReactQueryDevtools initialIsOpen={false} />}
          <Toaster toastOptions={toastOptions} />
        </QueryClientProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
