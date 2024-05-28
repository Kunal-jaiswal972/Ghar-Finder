import { SignUp } from "@clerk/clerk-react";
 

const SignUpComponent = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <SignUp routing="path" path="/sign-up" afterSignUpUrl="/" />
    </div>
  );
};

export default SignUpComponent;
