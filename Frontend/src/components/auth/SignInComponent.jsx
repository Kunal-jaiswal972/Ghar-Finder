import { SignIn } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

const SignInComponent = () => {
  const location = useLocation();
  const from = location.state?.from || "/";

  return (
    <div className="h-full flex items-center justify-center">
      <SignIn routing="path" path="/sign-in" afterSignInUrl={from} />
    </div>
  );
};

export default SignInComponent;
