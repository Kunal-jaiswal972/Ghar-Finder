import { SignUp } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

const SignUpComponent = () => {
  const location = useLocation();
  const from = location.state?.from || "/";

  return (
    <div className="h-full flex items-center justify-center">
      <SignUp routing="path" path="/sign-up" afterSignUpUrl={from} />
    </div>
  );
};

export default SignUpComponent;
