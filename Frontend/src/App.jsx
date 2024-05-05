import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ThemeProvider } from "@/components/themes/theme-provider";
import SignInComponent from "@/components/auth/SignInComponent";
import SignUpComponent from "@/components/auth/SignUpComponent";

import RootLayout from "@/layouts/rootLayout";
import ProtectedLayout from "@/layouts/ProtectedLayout";

import { DEV_MODE, toastOptions } from "@/config/config";
import Map from "@/components/map/map";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route
                index
                element={
                  <ProtectedLayout>
                    <Map/>
                  </ProtectedLayout>
                }
              />
              <Route path="sign-in/*" element={<SignInComponent />} />
              <Route path="sign-up/*" element={<SignUpComponent />} />
            </Route>
          </Routes>

          {DEV_MODE && <ReactQueryDevtools initialIsOpen={false} />}
          <Toaster toastOptions={toastOptions} />
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
